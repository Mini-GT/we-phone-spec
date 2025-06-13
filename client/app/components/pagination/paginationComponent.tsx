import NextButton from "~/components/pagination/nextButton";
import PageNumbers from "~/components/pagination/pageNumbers";
import PreviousButton from "~/components/pagination/previousButton";
import RowsPerPage from "~/components/pagination/rowsPerPage";
import type { Smartphone } from "~/types/globals.type";

type PaginationComponentProps<T> = {
  setCurrentPage: (page: number) => void;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  endIndex: number;
  items: T[];
  rowsPerPage: number;
  setRowsPerPage: (rows: number) => void,
  totalRows: number;
};

export default function PaginationComponent<T>({
  setCurrentPage,
  currentPage,
  totalPages,
  startIndex,
  endIndex,
  items,
  rowsPerPage,
  setRowsPerPage,
  totalRows
}: PaginationComponentProps<T>) {
  // Change page
    function paginate(pageNumber: string | number) { 
      return setCurrentPage(pageNumber as number)
    };
    
    // Views
    // const [views, setViews] = useState<number>()
  
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
    <>
      <div className="flex w-full items-start gap-2 justify-between mt-6">
          {/* Rows per page */}
          <div className="relative">
            <RowsPerPage
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              setCurrentPage={setCurrentPage}
              totalRows={totalRows}
            />
          </div>
          
          <div className="">
            <div className="flex relative">
              {/* Previous button */}
              <PreviousButton
                goToPreviousPage={goToPreviousPage}
                currentPage={currentPage}
              />
              
              {/* Page numbers */}
              <PageNumbers
                getPageNumbers={getPageNumbers}
                currentPage={currentPage}
                paginate={paginate}
              />
              
              {/* Next button */}
              <NextButton
                goToNextPage={goToNextPage}
                currentPage={currentPage}
                totalPages={totalPages}
              />
            </div>
            
      
            <div className="mt-2 text-center text-sm text-gray-500">
              Showing {startIndex + 1}-{Math.min(endIndex, items.length)} of {items.length} items
            </div>
          </div>
      </div>
    </>
  )
}