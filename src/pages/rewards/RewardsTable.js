import React from "react"; // Importing React library
import Table from "../../components/table"; // Importing the Table component used for rendering the rewards table
import { RewardYearTable } from "./RewardYearTable"; // Importing the RewardYearTable component to display yearly reward data

/**
 * RewardsTable Component
 * Displays a table containing customer rewards data.
 */
const RewardsTable = ({
  rewards, // Array of customer reward data
  onSort, // Function to handle sorting
  onPageChange, // Function to change pages
  totalPages, // Total available pages
  currentPage, // Current selected page
}) => {
   
  // Defines the structure of table columns including data keys, labels, and custom render functions
  const columns = [
    { 
      key: "customerName", // Data key to extract the customer name
      label: "Customer Name" // Column header label displayed in the table
    },

    {
      key: "years", // Data key containing yearly rewards information
      label: "Rewards (points)", // Column header label for rewards section
      
      // Custom rendering function for the "Rewards (points)" column
      // This function takes `years` data as input and passes it to the `RewardYearTable` component
      render: (years) => <RewardYearTable years={years} />
    },

    { 
      key: "totalAmount", // Data key for total amount spent by the customer
      label: "Total Amount ($)" // Column header label for total spending
    }, 

    { 
      key: "totalRewards", // Data key for total rewards earned
      label: "Total Rewards (points)" // Column header label for total rewards
    }, 
  ];

  return (
    // Renders the custom Table component with provided data, columns, and event handlers
    <Table
      testId={'rewards-table'} // Assigns a test ID for testing purposes
      data={rewards} // Passes the rewards data to be displayed in the table
      columns={columns} // Defines the table columns structure
      onSort={onSort} // Handles sorting when clicking on column headers
      onPageChange={onPageChange} // Handles page change actions
      totalPages={totalPages} // Provides total pages count for pagination
      currentPage={currentPage} // Tracks the currently active page
    />
  );
};

export default RewardsTable; // Exports the RewardsTable component for use in other parts of the application
