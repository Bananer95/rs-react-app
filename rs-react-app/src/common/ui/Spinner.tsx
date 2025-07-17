import React from 'react';

const Spinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-4" data-testid="spinner">
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
};

export default Spinner;
