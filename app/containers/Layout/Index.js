import NavBar from '@/components/Navbar/Index';
// import SideBar from '@/components/Sidebar/Index';
import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="flex h-[calc(100vh_-_63px)]">
        {/* <SideBar /> */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
