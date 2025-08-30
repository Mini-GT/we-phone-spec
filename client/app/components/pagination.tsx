import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { type FetcherWithComponents } from 'react-router';

type PaginationProps = {
  totalItems: number | undefined
  fetcher: FetcherWithComponents<any>
  action: string
  itemsPerPage?: number
}

export default function Pagination({
  totalItems = 0,
  fetcher,
  action,
  itemsPerPage = 5
}: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [skip, setSkip] = useState<number>(0)
  
  const fetchData = async (action: string) => {
    fetcher.submit(
      { pagination: JSON.stringify({ take: itemsPerPage, skip }) },
      { method: "post", action }
    )
  };

  useEffect(() => {
    const newSkip = (currentPage - 1) * itemsPerPage;
    setSkip(newSkip);
  }, [currentPage]);

  useEffect(() => {
    fetchData(action);
  }, [skip, action]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div className="max-w-5xl w-full rounded-b-md py-2 text-sm md:text-md bg-white">
      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`flex items-center px-1 py-1 rounded-lg transition-colors cursor-pointer ${
            currentPage === 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          <ChevronLeft className="h-5 w-5 xl:h-7 xl:w-7" />
          {/* Previous */}
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1">
          {generatePageNumbers().map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="text-gray-500">...</span>
              ) : (
                <button
                  onClick={() => handlePageChange(page as number)}
                  className={`w-7 h-7 xl:w-10 xl:h-10 rounded-full transition-colors cursor-pointer ${
                    currentPage === page
                      ? 'bg-blue-600 text-white'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`flex items-center px-1 py-1 rounded-lg transition-colors cursor-pointer ${
            currentPage === totalPages
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}
        >
          {/* Next */}
          <ChevronRight className="h-5 w-5 xl:h-7 xl:w-7" />
        </button>
      </div>
    </div>
  );
};