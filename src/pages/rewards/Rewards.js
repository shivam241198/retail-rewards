import React, { useEffect, useState } from "react";
import RewardsTable from "./RewardsTable"; // Importing the RewardsTable component
import { fetchCustomerTransactions } from "../../server/RewardsCustomerApi"; // Importing API function to fetch customer transactions
import useDebounce from "../../utils/Usedebounce"; // Importing debounce hook to optimize search queries
import "./rewards.scss"; // Importing styles for the Rewards component

const Rewards = () => {
  // State variables to manage data, loading status, pagination, sorting, and search input
  const [loading, setLoading] = useState(true); // Indicates whether data is being fetched
  const [rewardData, setRewardData] = useState([]); // Stores the fetched reward transactions
  const [currentPage, setCurrentPage] = useState(1); // Tracks the current page for pagination
  const [totalPages, setTotalPages] = useState(1); // Stores the total number of pages
  const [sortBy, setSortBy] = useState("customerName"); // Determines the column used for sorting
  const [sortDirection, setSortDirection] = useState("asc"); // Tracks sorting order (ascending/descending)
  const [search, setSearch] = useState(""); // Stores the user's search query for filtering results

  // Debounce search input to optimize API calls (waits 500ms before triggering the search)
  const debouncedSearch = useDebounce(search, 500);

  //  Fetches rewards data from the API with pagination, sorting, and search filters.
  const getRewards = async () => {
    try {
      const response = await fetchCustomerTransactions({
        page: currentPage, // Current page number
        pageSize: 5, // Number of results per page
        sortBy, // Column used for sorting
        sortDirection, // Sorting order (asc/desc)
        search, // Search query to filter results
      });

      console.log(response, "response"); // Debugging: Log API response

      // Update state with the fetched rewards data
      setRewardData(response.data);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching transactions:", error); // Handle API errors
    } finally {
      setLoading(false); // Disable loading indicator once data is fetched
    }
  };

  /**
   * useEffect hook triggers `getRewards` whenever dependencies change.
   * Dependencies include page number, sorting direction, and debounced search query.
   */

  useEffect(() => {
    getRewards();
  }, [currentPage, sortBy, sortDirection, debouncedSearch]); // Dependency array ensures data is fetched when values change

  /**
   * Handles sorting logic when a column header is clicked.
   * Toggles sorting order between ascending and descending.
   */

  const handleSort = (column) => {
    setSortDirection(sortBy === column && sortDirection === "asc" ? "desc" : "asc");
    setSortBy(column);
  };

  return (
    <div className="w-100 reward-container" data-testid="rewards-component">
      {/* Page title */}
      <h1 className="text-2xl font-bold mb-4">Rewards Offers</h1>

      {/* Show loading message while data is being fetched */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Search input field to filter rewards based on customer name */}
          <input
            className="reward-search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer name..."
          />

          {/* Rewards table displaying transaction data */}
          <RewardsTable
            rewards={rewardData} // Pass rewards data as props
            onSort={handleSort} // Function to handle sorting
            onPageChange={setCurrentPage} // Function to handle pagination
            currentPage={currentPage} // Current page number
            totalPages={totalPages} // Total number of pages
          />
        </>
      )}
    </div>
  );
};

export default Rewards; // Exporting the Rewards component for use in other parts of the application
