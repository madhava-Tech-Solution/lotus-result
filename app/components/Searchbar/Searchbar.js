import React, { useContext } from 'react';
import { TextContext } from '@/contexts/SearchContext';
import { FaSearch } from 'react-icons/fa';

const Searchbar = () => {
  const { search, setSearch } = useContext(TextContext);
  return (
    // <div className="">
    // {!isOpen && (
    //     <button
    //       className="flex items-center px-3 focus:outline-none"
    //       onClick={handleOpen}
    //     >
    //       <FaSearch className="h-6 w-6 text-gray-400" />
    //     </button>
    //   )}

    //   {isOpen && (
    //     <div className=" flex items-center">
    //       <input
    //         autoFocus
    //         type="text"
    //         className=" w-full px-4 py-2 border border-gray-300 rounded-l-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //         placeholder="Search..."
    //         value={search}
    //         onChange={(e) => setSearch(e.target.value)}
    //       />
    //       <button
    //         type="button"
    //         className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    //         onClick={handleClose}
    //       >
    //         Close
    //       </button>
    //     </div>
    //   )}
    // </div>
    <div className="">
      <div className=" relative flex items-center">
        <input
          autoFocus
          type="text"
          className=" w-full h-14 px-8 mx-2 py-2 border border-gray-700 rounded-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span className="ay-center right-3 z-10 mx-4 cursor-pointer text-slate-500">
          <FaSearch />
        </span>
        {/* <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-r-md bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          onClick={handleClose}
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

export default Searchbar;
