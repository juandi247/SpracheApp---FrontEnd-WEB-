export function Spinner() {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="spinner-border animate-spin inline-block w-16 h-16 border-4 border-t-yellow-500 border-solid rounded-full"></div>
        <span className="text-white mt-4">Validating data...</span>
      </div>
    );
  }
  