import { calculateCustomerRewards } from "../utils/RewardsCalculation";
import { purchaseTransactions } from "./CustomerService";

export const fetchCustomerTransactions = async ({ page = 1, pageSize = 5, sortBy = "date", sortDirection = "desc" }) => {
    const customerData = await purchaseTransactions(); // fetch all transactions from simulated
    const customerList=calculateCustomerRewards(customerData);
  
    // sorting
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
  
    // pagination
    const totalRecords = sortedData.length;
    const totalPages = Math.ceil(totalRecords / pageSize);
    const startIdx = (page - 1) * pageSize;
    const paginatedData = sortedData.slice(startIdx, startIdx + pageSize);
  
    return {
      data: paginatedData,
      currentPage: page,
      totalPages,
      totalRecords,
      pageSize,
    };
  };
  