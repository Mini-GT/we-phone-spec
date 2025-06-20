// export function Spinner() {
//   return (
//     <div className="h-screen flex flex-col justify-center items-center">
//       <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
//       <p className="mt-4 text-blue-500">Loading...</p>
//     </div>
//   );
// }

type SpinnerProps = {
  childClassName?: string
  parentClassName?:  string
}

export function Spinner({ parentClassName = 'h-screen fixed inset-0 bg-white z-2', childClassName = ''}: SpinnerProps) {
  return (
    <div className={`flex items-center justify-center ${parentClassName}`}>
      <div
        className={`animate-spin rounded-full border-t-4 border-blue-500 border-solid aspect-square ${childClassName}`}
      />
    </div>
  );
};
