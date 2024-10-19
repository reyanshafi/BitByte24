import React from "react";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin"
        style={{ animation: "custom-spin 2s linear infinite" }}
      ></div>
    </div>
  );
};

export default Spinner;
