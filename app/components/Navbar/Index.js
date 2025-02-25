import { removeAuthCookie } from '@/utils/apiHandlers';
import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const logout = () => {
    navigate('/login');
    Cookies.remove('__user__isLoggedIn');
    Cookies.remove('test__user__isLoggedIn');
    Cookies.remove('development__user__isLoggedIn');
    removeAuthCookie();
    toast.success('Logged Out Successfully...');
    localStorage.removeItem('owner_id');
    localStorage.removeItem('owner_username');
    localStorage.removeItem('owner_path');
    localStorage.removeItem('owner_balance');
    localStorage.removeItem('isPasswordChanged');
    localStorage.removeItem('owner_type');
    localStorage.removeItem('owner_ap');
    navigate('/login');
  };
  return (
    <>
      <div className=" w-full h-20  bg-[#28052B] grid grid-cols-2 gap-4">
        <div className="py-2">
          <Link to="/">
            <img
              src="/images/logo.png"
              alt=""
              className=" w-40 h-18 mx-4 mt-2"
            />
          </Link>
        </div>
        <div className="flex flex-row-reverse">
          <div className="relative inline-block mx-4">
            <button
              type="button"
              onClick={toggleDropdown}
              className="focus:outline-none rounded-full p-2 mt-2"
            >
              <img
                src="/images/profile.webp"
                className=" w-12 h-12 rounded-full"
              />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 shadow-md bg-[#230526] rounded-md z-50">
                <ul className="py-1">
                  <li>
                    <div className="p-4 grid justify-center items-center font-bold">
                      <h3 className="font-semibold text-xl"></h3>
                      <h5 className="text-sm text-gray-500"></h5>
                    </div>
                  </li>
                  <li>
                    <div className="block p-2  hover:bg-gray-800 text-center  ">
                      <button
                        className="font-bold bg-[#8E1E98] text-white px-4 py-3 w-32 border rounded-md"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
{
  /* <div className=" "> */
}
{
  /* <input
  className="input-field  w-full  p-3 text-gray-700 border rounded-md"
  type="text"
  placeholder="search Here"
  name="search"
  id="search"
  value={search}
  onChange={(e) => setSearch(e.target.value)}

  // onChange={handleChange}
/>
<span className="ay-center right-3 z-10 text-24  cursor-pointer text-slate-500">
  {reactIcons.search}
</span> */
}
{
  /* <Searchbar /> */
}
// </div>
