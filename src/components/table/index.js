import "./table.scss";
const Table = ({
  columns,
  data,
  onSort,
  onPageChange,
  totalPages,
  currentPage,
  testId,
}) => {
  return (
    <div className="p-4 rewardTable" data-testid={testId}>
      <table className="min-w-full border bg-white">
        <thead>
          <tr>
            {/* mapping the column list */}
            {columns.map((col) => (
              <th
                key={col.key}
                className="border px-4 py-2 cursor-pointer"
                onClick={() => onSort(col.key)}
              >
                {col.label} ⬍
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* mapping the row list */}
          {data.length > 0 ? (
            data.map((row) => (
              <tr key={row.customerId} className="border">
                {/* mapping the column list */}
                {columns.map((col) => (
                  <td key={`${row.id}-${col.key}`} className="border px-4 py-2">
                    {/* Check if the render method exists in the column list based on the value to be display */}
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr> No data found</tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls  */}
      <div className="flex justify-between items-center mt-4 pagination-container ">
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50  pagination-btn"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50  pagination-btn"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
