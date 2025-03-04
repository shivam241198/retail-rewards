import { calculateCustomerRewards } from "../utils/RewardsCalculation";
import { purchaseTransactions } from "./CustomerService";

  // Fetches customer transaction data, processes rewards, applies sorting, searching, and pagination.

export const fetchCustomerTransactions = async ({
  page = 1,
  pageSize = 5,
  sortBy = "date",
  sortDirection = "desc",
  search = "",
}) => {
  // Fetch all transaction data from the simulated API
  const customerData = await purchaseTransactions(); 
  
  // Calculate customer rewards based on transactions
  let customerList = calculateCustomerRewards(customerData);

  //  Filtering: Search customers by name (case-insensitive)
  if (search !== "") {
    customerList = customerList.filter((tx) =>
      tx.customerName.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Sorting: Sort customer list based on the specified column and direction
  const sortedData = [...customerList].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === "number") {
      return sortDirection === "asc" ? valA - valB : valB - valA;
    }
    return sortDirection === "asc"
      ? valA.localeCompare(valB)
      : valB.localeCompare(valA);
  });

  // Pagination: Calculate total records and slice data accordingly
  const totalRecords = sortedData.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const startIdx = (page - 1) * pageSize;
  const paginatedData = sortedData.slice(startIdx, startIdx + pageSize);

  // Return the final processed data with pagination details
  return {
    data: paginatedData,   // Customer transactions for the requested page
    currentPage: page,     // Current page number
    totalPages,           // Total pages available
    totalRecords,         // Total number of records after filtering
    pageSize,             // Number of records per page
  };
};
