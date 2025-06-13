type PageNumbersProps = {
  getPageNumbers: () => (string | number)[];
  currentPage: number;
  paginate: (pageNumber: string | number) => void;
};

export default function PageNumbers({
  getPageNumbers,
  currentPage,
  paginate
}: PageNumbersProps) {
  return (
    <div className="flex gap-2">
      {getPageNumbers().map((number, idx) => (
        number === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-1 border-t border-b">
            ...
          </span>
        ) : (
          <button
            key={number}
            onClick={() => paginate(number)}
            className={`px-3 py-1 border-t border-b ${
              currentPage === number
                ? 'bg-blue-500 text-white cursor-pointer'
                : 'bg-white hover:bg-gray-50 cursor-pointer'
            }`}
          >
            {number}
          </button>
        )
      ))}
    </div>
  )
}