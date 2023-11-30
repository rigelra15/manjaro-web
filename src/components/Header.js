import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import logoManjaro from '../assets/logo-manjaro.png';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { FaSignOutAlt } from 'react-icons/fa';

const HeaderAdmin = () => {
  const location = useLocation();
  const [user, setUser] = useState(null); // State untuk menyimpan informasi pengguna

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
  };

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
          <ul className="flex visible lg:space-x-2 md:space-x-0 items-center justify-end">
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
            {user ? ( // Tampilkan tautan profil jika pengguna sudah login
              <>
                <li
                  className="px-5 py-2 rounded-2xl border-2 border-gray-200 flex flex-row gap-2 items-center justify-center"
                >
                  {/* <Link to="/profile">{user.email}</Link> */}
                  <p>{user.displayName}</p>
                  <img src={user.photoURL} alt="" className='w-7 h-7 rounded-full' />
                </li>
                <li
                  className="px-3 py-3 rounded-2xl bg-red-500 text-white hover:bg-gray-500"
                  onClick={handleSignOut}
                >
                  <FaSignOutAlt />
                </li>
              </>
            ) : (
              <li
                className="px-5 py-2 rounded-2xl bg-sky-500 text-white hover:bg-gray-500"
              >
                <Link to="/signin">Sign In</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
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

export default HeaderAdmin;
