import React from "react";
import Table from "../../components/table";

const RewardsTable = ({
  rewards,
  onSort,
  onPageChange,
  totalPages,
  currentPage,
}) => {
 
  // define column names with corresponding keys
  const columns = [
    { key: "customerName", label: "Customer Name" },
    {
      key: "months",
      label: "Monthly Rewards (points)",
      // This method is used to extract the list based on month and rewards
      render: (months) =>
        Object.entries(months).map(([month, data]) => (
          <div key={data.id}>
            {month} - {data.rewards}
          </div>
        )),
    },
    { key: "totalAmount", label: "Total Amount ($)" },
    { key: "totalRewards", label: "Total Rewards (points)" },
  ];

  return (
    // Pass the required props to the custom table
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
