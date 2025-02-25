import React from 'react';
import PulseLoader from 'react-spinners/PulseLoader';
const Loading = () => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-white backdrop-blur-sm">
      <PulseLoader color="#0F2327" />
    </div>
  );
};

export default Loading;
