type RowsPerPageProps = {
  rowsPerPage: number
  setRowsPerPage: (rows: number) => void
  setCurrentPage: (page: number) => void
  totalRows: number
}

export default function RowsPerPage({
  rowsPerPage,
  setRowsPerPage,
  setCurrentPage,
  totalRows
}: RowsPerPageProps) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">Rows per page</span>
      <select
        name="pages"
        id="page-select"
        value={rowsPerPage}
        onChange={(e) => {
          setRowsPerPage(Number(e.target.value));
          setCurrentPage(1);
        }}
        className="border border-gray-300 rounded px-2 py-1 text-sm"
      >
        <option value={1}>1</option>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
      </select>
    </div>
  )
}