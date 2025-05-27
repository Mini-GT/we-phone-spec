import { phones } from 'mockData';
import { useState } from 'react';
import { Link } from 'react-router';
import TopTenSection from '~/components/topTenSection';
import type { Smartphone } from '~/types/globals.type';
import { formatNumberToCompact } from '~/utils/formatNumber';

type PaginationProps = {
  data: Smartphone[];
  title: string;
};

export default function Pagination({
  data = phones,
  title
}: PaginationProps) {
  // const data = phones;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;
  
  // Calculate total pages
  const totalPages = Math.ceil(data.length / itemsPerPage);
  
  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  
  // Change page
  function paginate(pageNumber: string | number) { 
    return setCurrentPage(pageNumber as number)
  };
  
  // Views
  const [views, setViews] = useState<number>()

  // Previous page
  function goToPreviousPage() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  // Next page
  function goToNextPage() {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Generate page numbers with ellipsis
  function getPageNumbers() {
    const pageNumbers = [];
    
    if (totalPages <= 10) {
      // If 10 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always show first page
      pageNumbers.push(1);
      
      if (currentPage <= 3) {
        // Near start
        pageNumbers.push(2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near end
        pageNumbers.push('...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        // Middle
        pageNumbers.push(
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages
        );
      }
    }
    
    return pageNumbers;
  };
  
  return (
    <div className="relative">
        <h1 className="text-xl font-bold my-4">{title}</h1>
        {/* Current items */}
        <ul className="mb-4 grid grid-cols-[230px_230px_230px_230px_230px] gap-4 rounded">
          {currentItems.map(item => (
            <div key={item.id} data-id={item.id} className="flex flex-col justify-between items-start max-w-[15rem] cursor-pointer">
              <Link to={`/smartphones/${item.name}-${item.id}`} >
                <div className="relative">
                  <img src={`/${item.image}`} alt={item.name} className="min-w-3 max-h-[250px] m-2" />
                  <div className="flex px-2 bg-black rounded-sm gap-1 cursor-default absolute bottom-0 m-5">
                    <img src="/eyeVector.svg" alt="views" className="w-4" />
                    <div className='text-sm text-white'>
                      {formatNumberToCompact(item.views)}
                    </div>
                  </div>
                </div>
              </Link>
              <div className="mx-2">
                <button className="hover:text-pink-600 cursor-pointer">
                  {item.name}
                </button>
              </div>
            </div>
          ))}
        </ul>
        
        {/* Pagination */}
        <div className="flex items-center gap-2 justify-center mt-6">
          {/* Previous button */}
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-l border ${
              currentPage === 1 
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                : 'bg-white hover:bg-gray-50 cursor-pointer'
            }`}
          >
            Previous
          </button>
          
          {/* Page numbers */}
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
          
          {/* Next button */}
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`px-3 py-1 rounded-r border ${
              currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white hover:bg-gray-50 cursor-pointer'
            }`}
          >
            Next
          </button>
        </div>
        
        <div className="mt-2 text-center text-sm text-gray-500">
          Showing {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, data.length)} of {data.length} items
        </div>
      </div>
  );
}