import React, { useEffect, useState } from "react";
import RewardsTable from "./RewardsTable";
import { fetchCustomerTransactions } from "../../server/RewardsCustomerApi";
import useDebounce from "../../utils/Usedebounce";
import "./rewards.scss";

const Rewards = () => {
  // State variables to manage rewards data, pagination, sorting, and search
  const [loading, setLoading] = useState(true); // Loading state
  const [rewardData, setRewardData] = useState([]); // Stores fetched rewards data
  const [currentPage, setCurrentPage] = useState(1); // Current page in pagination
  const [totalPages, setTotalPages] = useState(1); // Total pages available
  const [sortBy, setSortBy] = useState("customerName"); // Column to sort by
  const [sortDirection, setSortDirection] = useState("asc"); // Sorting direction (asc/desc)
  const [search, setSearch] = useState(""); // Search input value

  // Debounce search input to reduce API calls (waits 500ms before triggering)
  const debouncedSearch = useDebounce(search, 500);

  // Fetches rewards data with pagination, sorting, and searching.

  const getRewards = async () => {
    try {
      const response = await fetchCustomerTransactions({
        page: currentPage,
        pageSize: 5,
        sortBy,
        sortDirection,
        search, // Search term for filtering customer names
      });

      console.log(response, "response"); // Debugging: Logs API response

      // Update state with fetched data
      setRewardData(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false); // Stop loading indicator after fetch attempt
    }
  };

  //Fetch rewards data whenever dependencies (page, sort, search) change.

  useEffect(() => {
    getRewards();
  }, [currentPage, sortBy, sortDirection, debouncedSearch]); // Dependencies trigger re-fetch

  // Handles sorting when a column header is clicked.
  //  Toggles between ascending and descending order.

  const handleSort = (column) => {
    setSortDirection(
      sortBy === column && sortDirection === "asc" ? "desc" : "asc"
    );
    setSortBy(column);
  };

  return (
    <div className="w-100 reward-container" data-testid="rewards-component">
      <h1 className="text-2xl font-bold mb-4">Rewards Offers</h1>

      {loading ? (
        <p>Loading...</p> // Show loading message while data is being fetched
      ) : (
        <>
          {/* Search input field */}
          <input
            className="reward-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name..."
          />

          {/* Display rewards data in a table */}
          <RewardsTable
            rewards={rewardData}
            onSort={handleSort}
            onPageChange={setCurrentPage}
            currentPage={currentPage}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default Rewards;
