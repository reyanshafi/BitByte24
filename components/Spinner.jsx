import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-7 h-7 border-4 border-t-4 border-white border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
