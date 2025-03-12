import "./table.scss";

const Table = ({
  columns,
  data,
  onSort,
  onPageChange,
  totalPages,
  currentPage,
  controllerDisable,
  testId,
}) => {
  return (
    <div className="p-4 rewardTable" data-testid={testId}>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            {/* Mapping the column list and disabling sorting when controllerDisable is true */}
            {columns.map((col) => (
              <th
                key={col.key}
                className={`border px-4 py-2 ${
                  controllerDisable ? "" : "cursor-pointer"
                }`}
                onClick={() => !controllerDisable && onSort(col.key)} // Disable sorting when controllerDisable is true
              >
                {col.label} {!controllerDisable && "⬍"}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* Checking if data exists before rendering table rows */}
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={`${row.customerId || row.year}`} className="border">
                {/* Mapping columns to populate row data */}
                {columns.map((col) => (
                  <td key={`${col.key}`} className="border px-4 py-2">
                    {/* Check if custom render function exists, otherwise display raw data */}
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center p-4">
                No data found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Pagination Controls - Disabled when controllerDisable is true */}
      {!controllerDisable && (
        <div className="flex justify-between items-center mt-4 pagination-container">
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 pagination-btn"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={controllerDisable || currentPage === 1} // Disable if controllerDisable is true
          >
            Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50 pagination-btn"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={controllerDisable || currentPage === totalPages} // Disable if controllerDisable is true
          >
            Next
          </button>
        </div>
      )}{" "}
    </div>
  );
};

export default Table;
