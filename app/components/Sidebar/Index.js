import MatchDataBookmaker from '@/containers/MatchDataBookmaker';
import MatchsData from '@/containers/MatchsData/Index';
import { ToggleTableContext } from '@/contexts/TogleContext';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {
  const { tooggleTableClick } = useContext(ToggleTableContext);

  return (
    <>
      <aside className="  h-[calc(100vh_-_64px)] w-1/5 grid justify-center items-center mr-5">
        <div className="">
          <div className="border rounded-md border-slate-100 flex  mx-4 w-52 h-16   justify-evenly  items-center gap-4 bg-[#482A4B]">
            <img
              src="/images/profile.webp"
              className=" w-12 h-12 rounded-full"
            />
            <h3 className="text-white">Admin</h3>
          </div>
        </div>
        {/* <div className="bg-[#071535]  p-4 text-white font-bold rounded-md text-center ">
          Dashboard
        </div> */}
        <div className="">
          <Link to="/">
            <div className="bg-[#482A4B]  p-4 text-white font-bold rounded-md text-center ">
              Dashboard
            </div>
          </Link>
          <div className="grid grid-cols-2 gap-2">
            <button
              // className=" bg-[#071535] "
              className={`  p-2 rounded-md  font-bold text-sm ${
                tooggleTableClick === 1
                  ? 'bg-[#A222AD]  text-white '
                  : 'bg-slate-300 text-slate-500 border-2 '
              }`}
            >
              Session{' '}
            </button>

            {/* <button
              className={` border  border-slate-100 p-2 rounded-md  font-bold text-sm ${
                tooggleTableClick === 2
                  ? 'bg-[#071535] text-white '
                  : 'bg-slate-300 text-slate-500 border-2 '
              }`}
            >
              Bookmaker
            </button> */}
          </div>
          {tooggleTableClick === 1 ? <MatchsData /> : <MatchDataBookmaker />}
        </div>
      </aside>
    </>
  );
};

export default SideBar;
