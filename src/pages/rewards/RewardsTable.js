import React from "react";
import Table from "../../components/table";
import { RewardYearTable } from "./RewardYearTable";

//RewardsTable Component Displays a table of customer rewards data.
 
const RewardsTable = ({
  rewards,
  onSort,
  onPageChange,
  totalPages,
  currentPage,
}) => {
 
  // Defines table column structure with respective data keys and labels. The `render` function is used for custom rendering of the "Rewards (points)" column.
  const columns = [
    { key: "customerName", label: "Customer Name" }, // Displays customer name

    {
      key: "years",
      label: "Rewards (points)",
      // Custom render function for displaying monthly rewards. Uses the `RewardYearTable` component to format the rewards data.
      
      render: (years) => <RewardYearTable years={years} />
    },

    { key: "totalAmount", label: "Total Amount ($)" }, // Displays total amount spent by customer
    { key: "totalRewards", label: "Total Rewards (points)" }, // Displays total rewards earned
  ];

  return (
    // Custom Table component to display rewards data.
    
    <Table
      testId={'rewards-table'}
      data={rewards}
      columns={columns}
      onSort={onSort}
      onPageChange={onPageChange}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
};

export default RewardsTable;
