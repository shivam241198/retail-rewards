import React, { useEffect, useState } from "react";
import RewardsTable from "./RewardsTable";
import { fetchCustomerTransactions } from "../../server/RewardsCustomerApi";

const Rewards = () => {
  const [loading, setLoading] = useState(true);
  const [rewardData, setRewardData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState("customerName");
  const [sortDirection, setSortDirection] = useState("asc");

  useEffect(() => {
    const getRewards = async () => {
      try {
        const response = await fetchCustomerTransactions({
          page: currentPage,
          pageSize: 5,
          sortBy,
          sortDirection,
        });  // fetch a rewards list based on customer from a simulated dataset, with support for pagination and sorting.
      
        setRewardData(response.data);  // setting rewards list based on customer
        setTotalPages(response.totalPages);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    getRewards();
  }, [currentPage, sortBy, sortDirection]); 

// handle sorting using the column name
  const handleSort = (column) => {
    setSortDirection(
      sortBy === column && sortDirection === "asc" ? "desc" : "asc"
    );
    setSortBy(column);
  };

  return (
    <div className="p-4 w-100" data-testid="rewards-component">
      <h1 className="text-2xl font-bold mb-4">Rewards Offers</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        // display the rewards list in a table format
        <RewardsTable
          rewards={rewardData}
          onSort={handleSort}
          onPageChange={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        /> 
      )}
    </div>
  );
};

export default Rewards;
