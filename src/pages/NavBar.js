import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaMagnifyingGlass, FaBars } from 'react-icons/fa6';
import bgMember from '../assets/bgMember20-Black.png';
import logoManjaro from '../assets/logo-manjaro.png';
import members from '../membersData';
import { IoCloseOutline } from "react-icons/io5";

const getBackgroundColor = (id) => {
  const colors = ['bg-[#DC143C]', 'bg-[#49B8D3]', 'bg-[#FFD801]', 'bg-[#0066CC]'];
  return colors[id % colors.length];
};

const NavBar = () => {
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
    if (searchInput.trim() !== '') {
      handleSearch();
      showSearchResultsOverlay();
    }
  }, [searchInput]);

  return (
    <>
      <nav className="bg-opacity-70 backdrop-blur-md bg-white p-2 justify-between flex items-center fixed w-full z-50 shadow-md">
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="ml-5 text-2xl focus:outline-none">
            <FaBars />
          </button>
        </div>
        <div className="ml-5 lg:ml-20">
          <Link to="/">
            <img src={logoManjaro} alt="logo-manjaro" className="w-16" />
          </Link>
        </div>
        <div className="lg:flex absolute lg:visible invisible inset-0 flex items-center justify-center">
          <ul className="flex lg:space-x-2 md:space-x-0 items-center justify-center">
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
        <div className="mr-5 lg:mr-20 relative flex flex-row items-center justify-center gap-5">
          <div className={`transition-all duration-500 flex flex-row rounded-xl ${searchInputClass}`} style={{ width: searchInputWidth }}>
            <div className="absolute inset-y-0 right-0 flex items-center pr-5 pointer-events-none">
              <FaMagnifyingGlass className={`${searchInputClass === 'focus' ? 'text-blue-500' : 'text-gray-400'}`} />
            </div>
            <input
              type="text"
              placeholder="Search Member"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="p-2 pl-5 border-2 rounded-full"
              style={{ width: '100%' }}
            />
          </div>
          {showSearchResults && (
            <div className="absolute top-14 bg-white border border-gray-300 w-full overflow-y-auto rounded-xl shadow-md">
              {filteredMembers.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="p-2 cursor-pointer hover:bg-gray-200 flex flex-row items-center justify-start"
                  onClick={() => {
                    hideSearchResultsOverlay();
                  }}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden mr-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ backgroundImage: `url(${bgMember})`, backgroundSize: 'cover' }}
                      className={`w-full h-full object-cover ${getBackgroundColor(member.id)}`}
                    />
                  </div>
                  <h2>{member.name}</h2>
                </div>
              ))}
            </div>
          )}
        </div>
      </nav>
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50">
          <button onClick={toggleMenu} className='absolute mt-6 ml-6'> 
            <IoCloseOutline className='w-10 h-10 text-white'/>
          </button>
          <div className="flex items-center justify-center h-screen">
            <ul className="text-white text-2xl flex flex-col gap-10 justify-center items-center">
              <li className={`px-4 py-1 rounded-full ${location.pathname === '/' ? 'bg-[#DC143C] text-white' : 'text-white hover:bg-gray-300 hover:text-black transition-transform duration-500'}`}>
                <Link to="/">Home</Link>
              </li>
              <li className={`px-4 py-1 rounded-full ${location.pathname === '/member' ? 'bg-[#49B8D3] text-white' : 'text-white hover:bg-gray-300 hover:text-black transition-transform duration-500'}`}>
                <Link to="/member">Member</Link>
              </li>
              <li className={`px-4 py-1 rounded-full ${location.pathname === '/achievement' ? 'bg-[#FFD801] text-white' : 'text-white hover:bg-gray-300 hover:text-black transition-transform duration-500'}`}>
                <Link to="/achievement">Achievement</Link>
              </li>
              <li className={`px-4 py-1 rounded-full ${location.pathname === '/profile' ? 'bg-[#0066CC] text-white' : 'text-white hover:bg-gray-300 hover:text-black transition-transform duration-500'}`}>
                <Link to="/profile">Profile</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap');
          .focus {
            width: 250px;
          }
        `}
      </style>
    </>
  );
};

export default NavBar;
