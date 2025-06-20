// export function Spinner() {
//   return (
//     <div className="h-screen flex flex-col justify-center items-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
//       <p className="mt-4 text-blue-500">Loading...</p>
//     </div>
//   );
// }

type SpinnerProps = {
  className?: string;
}

export function Spinner({ className = '' }: SpinnerProps) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div
        className={`animate-spin rounded-full border-t-4 border-blue-500 border-solid aspect-square ${className}`}
      />
    </div>
  );
};
