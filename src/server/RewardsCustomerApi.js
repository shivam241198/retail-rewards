import { calculateCustomerRewards } from "../utils/RewardsCalculation"; // Importing function to calculate customer rewards
import { purchaseTransactions } from "./CustomerService"; // Importing function to fetch customer transaction data

// Fetches customer transaction data, processes rewards, applies sorting, searching, and pagination.
export const fetchCustomerTransactions = async ({
  page = 1,         // Default page number is 1
  pageSize = 5,     // Default size 5 of records per page
  sortBy = "date",  // Default sorting column is "date"
  sortDirection = "desc", // Default sorting direction is descending
  search = "",      // Default search string is empty
}) => {
  // Fetch all transaction data from the simulated API
  const customerData = await purchaseTransactions(); 
  
  // Calculate customer rewards based on transactions
  let customerList = calculateCustomerRewards(customerData);

  // Filtering: Search customers by name (case-insensitive)
  if (search !== "") {
    customerList = customerList.filter((tx) =>
      tx.customerName.toLowerCase().includes(search.toLowerCase()) // Filters customers whose name includes the search string
    );
  }

  // Sorting: Sort customer list based on the specified column and direction
  const sortedData = [...customerList].sort((a, b) => {
    const valA = a[sortBy]; // Get sorting value for first item
    const valB = b[sortBy]; // Get sorting value for second item

    if (typeof valA === "number") { 
      // If sorting by numeric values, sort accordingly
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }
    // If sorting by string values, use localeCompare for comparison
    return sortDirection === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  // Pagination: Calculate total records and slice data accordingly
  const totalRecords = sortedData.length; // Get total records count
  const totalPages = Math.ceil(totalRecords / pageSize); // Calculate total number of pages
  const startIdx = (page - 1) * pageSize; // Calculate the starting index for slicing
  const paginatedData = sortedData.slice(startIdx, startIdx + pageSize); // Get records for the requested page

  // Return the final processed data with pagination details
  return {
    data: paginatedData,   // Customer transactions for the requested page
    currentPage: page,     // Current page number
    totalPages,            // Total pages available
    totalRecords,          // Total number of records after filtering
    pageSize,              // Number of records per page
  };
};
