type NextButtonProps = {
  goToNextPage: () => void;
  currentPage: number;
  totalPages: number;
};

export default function NextButton({
  goToNextPage,
  currentPage,
  totalPages
}: NextButtonProps) {
  return (
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
  )
}