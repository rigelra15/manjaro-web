import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoManjaro from '../assets/logo-manjaro.png';
import { FaMagnifyingGlass, FaBars } from 'react-icons/fa6';

const NavBar = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav className="bg-opacity-70 backdrop-blur-md bg-white p-4 justify-between flex items-center fixed w-full z-50 shadow-md">
        <div className="ml-5 lg:ml-20">
          <Link to="/">
            <img src={logoManjaro} alt="logo-manjaro" className="w-16" />
          </Link>
        </div>
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="p-2">
            <FaBars />
          </button>
        </div>
        <div
          className={`${
            menuOpen ? 'block' : 'hidden'
          } lg:flex absolute inset-0 flex items-center justify-center`}
        >
          <ul className="flex lg:visible lg:space-x-2 invisible md:space-x-0 items-center justify-center">
            <li className={`px-4 py-1 rounded-full ${location.pathname === '/' ? 'bg-[#DC143C] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`px-4 py-1 rounded-full ${location.pathname === '/member' ? 'bg-[#49B8D3] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'}`}>
              <Link to="/member">Member</Link>
            </li>
            <li className={`px-4 py-1 rounded-full ${location.pathname === '/achievement' ? 'bg-[#FFD801] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'}`}>
              <Link to="/achievement">Achievement</Link>
            </li>
            <li className={`px-4 py-1 rounded-full ${location.pathname === '/profile' ? 'bg-[#0066CC] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'}`}>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </div>
        <div className="mr-5 lg:mr-20 relative">
          <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
            <FaMagnifyingGlass className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search"
            style={{ width: 150 }}
            className="p-2 pl-5 border-2 rounded-full"
          />
        </div>
      </nav>
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
      </style>
    </>
  );
};

export default NavBar;