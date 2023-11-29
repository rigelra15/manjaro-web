import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoManjaro from '../assets/logo-manjaro.png';
import { FaMagnifyingGlass, FaBars } from 'react-icons/fa6';
import bgMember from '../assets/bgMember20-Black.png';

import members from '../membersData';

const getBackgroundColor = (id) => {
  const colors = ['bg-[#DC143C]', 'bg-[#49B8D3]', 'bg-[#FFD801]', 'bg-[#0066CC]'];
  return colors[id % colors.length];
};

const HeaderAdmin = () => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [searchInputClass, setSearchInputClass] = useState('');
  const [searchInputWidth, setSearchInputWidth] = useState('200px');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSearch = () => {
    const searchTerm = searchInput.toLowerCase();
    const filtered = members.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm) || member.nrp.includes(searchTerm)
    );
    setFilteredMembers(filtered);
  };

  const showSearchResultsOverlay = () => {
    setShowSearchResults(true);
  };

  const hideSearchResultsOverlay = () => {
    setShowSearchResults(false);
  };

  const handleSearchFocus = () => {
    setSearchInputClass('focus');
    setSearchInputWidth('250px');
    showSearchResultsOverlay();
  };

  const handleSearchBlur = () => {
    setSearchInputClass('');
    setSearchInputWidth('200px');
    setTimeout(() => hideSearchResultsOverlay(), 1);
  };

  const handleResultClick = () => {
    hideSearchResultsOverlay();
  };

  useEffect(() => {
    // Tambahkan kondisi untuk hanya melakukan pencarian jika searchInput tidak kosong
    if (searchInput.trim() !== '') {
      handleSearch();
      showSearchResultsOverlay();
    }
  }, [searchInput]);

  return (
    <>
      <nav className="bg-opacity-70 backdrop-blur-md bg-white p-4 justify-between flex items-center fixed w-full z-50 shadow-md">
        <div className="ml-5 lg:ml-20">
          <Link to="/">
            <img src={logoManjaro} alt="logo-manjaro" className="w-16" />
          </Link>
        </div>
        <div
          className={`lg:flex absolute inset-0 flex items-center justify-end mr-10 z-50`}
        >
          <ul className="flex visible lg:space-x-2 md:space-x-0 items-end justify-end">
            <li
              className={`px-4 py-1 rounded-full ${
                location.pathname === '/dba' ? 'bg-[#DC143C] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'
              }`}
            >
              <Link to="/dba">Home</Link>
            </li>
            <li
              className={`px-4 py-1 rounded-full ${
                location.pathname === '/dba/add' ? 'bg-[#49B8D3] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'
              }`}
            >
              <Link to="/dba/add">Add Member</Link>
            </li>
            <li
              className={`px-4 py-1 rounded-full ${
                location.pathname === '/dba/about' ? 'bg-[#FFD801] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'
              }`}
            >
              <Link to="/dba/about">About</Link>
            </li>
          </ul>
        </div>
        <h2 className='lg:flex absolute inset-0 flex items-center justify-center mr-10'>
          {/* {location.pathname === '/dba' && (
            <h2>Dashboard Admin</h2>
          )} */}
        </h2>
      </nav>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
          .focus {
            width: 250px; /* Set the width when the input is focused */
          }
        `}
      </style>
    </>
  );
};

export default HeaderAdmin;
