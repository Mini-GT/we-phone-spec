type SpinnerProps = {
  spinSize: string
  parentClassName?:  string
}

export function Spinner({ parentClassName = 'h-screen fixed inset-0 bg-white z-2', spinSize= ''}: SpinnerProps) {
  return (
    <div className={`flex items-center justify-center z-90 ${parentClassName}`}>
      <div
        className={`animate-spin rounded-full border-t-4 border-blue-500 border-solid aspect-square ${spinSize}`}
      />
    </div>
  );
};
