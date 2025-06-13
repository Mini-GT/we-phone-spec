type PreviousButtonProps = {
  goToPreviousPage: () => void;
  currentPage: number;
};

export default function PreviousButton({
  goToPreviousPage,
  currentPage
}: PreviousButtonProps) {
  return (
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
  );
}