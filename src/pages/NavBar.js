import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaMagnifyingGlass, FaBars } from 'react-icons/fa6';
import bgMember from '../assets/bgMember20-Black.png';
import logoManjaro from '../assets/logo-manjaro.png';
import members from '../membersData';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { IoCloseOutline } from "react-icons/io5";
import { FaSignOutAlt } from 'react-icons/fa';
import { MdOutlineSpaceDashboard, MdArrowForwardIos } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { BsGear } from "react-icons/bs";
import { RiAdminFill } from "react-icons/ri";

const getBackgroundColor = (id) => {
  const colors = ['bg-[#DC143C]', 'bg-[#49B8D3]', 'bg-[#FFD801]', 'bg-[#0066CC]'];
  return colors[id % colors.length];
};

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [filteredMembers, setFilteredMembers] = useState(members);
  const [searchInputClass, setSearchInputClass] = useState('');
  const [searchInputWidth, setSearchInputWidth] = useState('200px');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showPopupMenu, setShowPopupMenu] = useState(false);
  const [user, setUser] = useState(null); // State untuk menyimpan informasi pengguna

  // Function to handle hover and show pop-up menu
  const handleUserPhotoHover = () => {
    setShowPopupMenu(true);
  };

  // Function to handle mouse leave and hide pop-up menu
  const handleUserPhotoLeave = () => {
    setShowPopupMenu(false);
  };

  useEffect(() => {
    // Cek apakah pengguna sudah login, jika iya, atur state user
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      unsubscribe(); // Membersihkan listener saat komponen dibongkar
    };
  }, []);

  const handleSignOut = () => {
    // Fungsi untuk logout
    signOut(auth);
    setUser(null);
    navigate('/', { replace: true });
  };

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

  useEffect(() => {
    if (searchInput.trim() !== '') {
      handleSearch();
      showSearchResultsOverlay();
    }
  });

  // Assuming you have a list of names like this
  const memberEmails = ['admin@gmail.com', 'rigel8911@gmail.com', 'syawalridho3@gmail.com', 'manjaro.ce22@gmail.com', 'hypertopiaid@gmail.com'];

  // Check if the user's display name is in the list
  const isMember = user && memberEmails.includes(user.email);

  const isAdmin = user && (user.email === 'rigel8911@gmail.com' || user.email === 'syawalridho3@gmail.com');
  const bgColor = isAdmin ? 'bg-[#DC143C]' : (isMember ? 'bg-[#49B8D3]' : 'bg-black');
  const textContent = isAdmin ? 'Admin' : (isMember ? 'Member' : 'Guest');


  return (
    <>
      <nav className="bg-opacity-70 backdrop-blur-md bg-white p-2 py-3 justify-between flex items-center fixed w-full z-50 shadow-md">
        <div className="lg:hidden flex flex-row gap-2 items-center justify-center">
          <button onClick={toggleMenu} className="ml-5 text-2xl focus:outline-none">
            <FaBars />
          </button>
          <div className="ml-5 lg:ml-20 cursor-pointer z-50">
            <Link to="/">
              <img src={logoManjaro} alt="logo-manjaro" className="w-16 cursor-pointer" />
            </Link>
          </div>
        </div>
        <div className="ml-5 lg:ml-20 cursor-pointer lg:block hidden z-50">
          <Link to="/">
            <img src={logoManjaro} alt="logo-manjaro" className="w-16 cursor-pointer" />
          </Link>
        </div>
        <div className="lg:flex absolute lg:visible invisible inset-0 flex items-center justify-center">
          <ul className="flex lg:space-x-2 md:space-x-0 items-center justify-center">
            <li className={`px-4 py-1 rounded-full ${location.pathname === '/' ? 'bg-[#DC143C] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'}`}>
              <Link to="/">Home</Link>
            </li>
            <li className={`px-4 py-1 rounded-full ${location.pathname === '/member' ? 'bg-[#49B8D3] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'}`}>
              {user ? <Link to="/member">Member</Link> : <Link to="/signin">Member</Link>}
            </li>
            <li className={`px-4 py-1 rounded-full ${location.pathname === '/achievement' ? 'bg-[#FFD801] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'}`}>
              {user ? <Link to="/achievement">Achievement</Link> : <Link to="/signin">Achievement</Link>}
            </li>
            <li className={`px-4 py-1 rounded-full ${location.pathname === '/profile' ? 'bg-[#0066CC] text-white' : 'text-black hover:bg-gray-300 transition-transform duration-500'}`}>
              {user ? <Link to="/profile">Profile</Link> : <Link to="/signin">Profile</Link>}
            </li>
          </ul>
        </div>
        <div className="mr-5 lg:mr-20 relative flex flex-row items-center justify-center gap-5">
          <div className={`transition-all duration-500 flex flex-row rounded-xl ${searchInputClass}`} style={{ width: searchInputWidth }}>
            {/* <input
              type="text"
              placeholder="Search Member"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onFocus={handleSearchFocus}
              onBlur={handleSearchBlur}
              className="p-2 pl-5 border-2 rounded-full"
              style={{ width: '100%' }}
            /> */}
            {/* <FaMagnifyingGlass className={`${searchInputClass === 'focus' ? 'text-blue-500' : 'text-gray-400'} -mr-5`} /> */}
          </div>
          <div className='flex flex-row gap-3' onMouseEnter={handleUserPhotoHover} onMouseLeave={handleUserPhotoLeave}>
            {user ? ( // Tampilkan tautan profil jika pengguna sudah login
              <>
                <ul className='flex flex-row gap-2 items-center justify-center'>
                  <li className={`${showPopupMenu ? 'opacity-100' : 'opacity-0'} lg:transition-all lg:duration-300 lg:opacity-100 lg:ease-in-out mr-2 flex flex-col items-end justify-end`}>
                    <span>{user.displayName}</span>
                    <span className={`text-xs px-3 py-1 ${bgColor} text-white rounded-full`}>{textContent}</span>
                  </li>
                  <li className='bg-white p-[2px] border-2 border-sky-500 rounded-full'>
                    <img src={user.photoURL} alt="" className='w-10 h-10 rounded-full border-2 border-white' />
                  </li>
                  <li>
                    <MdArrowForwardIos className={`${showPopupMenu ? '-rotate-90' : 'rotate-90'} transition-all duration-200 ease-in-out w-3 h-3 text-gray-500 `}/>
                  </li>
                </ul>
              </>
            ) : (
              <ul>
                <Link to='/signin'>
                  <li
                    className="px-5 py-3 rounded-2xl bg-sky-500 text-white hover:bg-gray-500"
                  >
                    Sign In
                  </li>
                </Link>
              </ul>
            )}
          </div>
          {/* THIS IS THE POP UP MENU WHEN PROFILE PHOTO HOVERED */}
          {user && (
            <div onMouseEnter={handleUserPhotoHover} onMouseLeave={handleUserPhotoLeave} className={`${showPopupMenu ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300 ease-in-out flex flex-col items-end justify-end gap-0 absolute top-0 mt-[7px] right-0 z-20 w-fit`}>
              <div className='w-10 h-12'>
              </div>
              <div className='bg-white border-2 rounded-2xl w-fit'>
                <ul className='space-y-3'>
                  {user.displayName === 'Rigel Ramadhani W.' && (
                    <Link to='/dba'>
                      <li className='flex flex-row gap-2 bg-red-500 pb-4 rounded-t-xl items-center justify-start px-5 pt-4 cursor-pointer'>
                        <RiAdminFill className='text-white' />
                        <span className='text-white'>Dashboard</span>
                        <span className='text-sm bg-white rounded-full px-2 py-1 text-red-500'>Admin</span>
                      </li>
                    </Link>
                  )}
                  <li className={`flex flex-row gap-2 items-center justify-start py-2 px-5 ${user.displayName === 'Rigel Ramadhani W.' ? '' : 'pt-4'} cursor-pointer`}>
                    <MdOutlineSpaceDashboard />
                    <span>Dashboard</span>
                  </li>
                  <li className='flex flex-row gap-2 items-center justify-start py-2 px-5 cursor-pointer'>
                    <FaRegUser />
                    <span>My Profile</span>
                  </li>
                  <li className='flex flex-row gap-2 items-center justify-start py-2 px-5 cursor-pointer'>
                      <BsGear />
                      <span>Settings</span>
                  </li>
                  <li className='flex flex-row gap-2 items-center justify-start py-2 px-5 bg-red-500 text-white rounded-b-2xl cursor-pointer' onClick={handleSignOut}>
                      <FaSignOutAlt />
                      <span>Sign Out</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
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
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 lg:hidden visible">
          <button onClick={toggleMenu} className='absolute mt-6 ml-6'> 
            <IoCloseOutline className='w-10 h-10 text-white'/>
          </button>
          <div className="flex items-center justify-center h-screen">
            <ul className="text-white text-2xl flex flex-col gap-10 justify-center items-center">
              <li className={`px-4 py-1 rounded-full ${location.pathname === '/' ? 'bg-[#DC143C] text-white' : 'text-white hover:bg-gray-300 hover:text-black transition-transform duration-500'}`}>
                <Link to="/">Home</Link>
              </li>
              <li className={`px-4 py-1 rounded-full ${location.pathname === '/member' ? 'bg-[#49B8D3] text-white' : 'text-white hover:bg-gray-300 hover:text-black transition-transform duration-500'}`}>
                {user ? <Link to="/member">Member</Link> : <Link to="/signin">Member</Link>}
              </li>
              <li className={`px-4 py-1 rounded-full ${location.pathname === '/achievement' ? 'bg-[#FFD801] text-white' : 'text-white hover:bg-gray-300 hover:text-black transition-transform duration-500'}`}>
                {user ? <Link to="/achievement">Achievement</Link> : <Link to="/signin">Achievement</Link>}
              </li>
              <li className={`px-4 py-1 rounded-full ${location.pathname === '/profile' ? 'bg-[#0066CC] text-white' : 'text-white hover:bg-gray-300 hover:text-black transition-transform duration-500'}`}>
                {user ? <Link to="/profile">Profile</Link> : <Link to="/signin">Profile</Link>}
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
