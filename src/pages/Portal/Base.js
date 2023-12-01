import React, { useState } from 'react';
import logoArrowBack from '../../assets/arrowBack.svg';
import logoManjaroWhite from '../../assets/logoWhite.png';
import { MdOutlineSpaceDashboard, MdOutlineAccountCircle, MdOutlineEvent, MdOutlineAnnouncement, MdOutlineSettings } from "react-icons/md";
import DashboardAdmin from '../Admin/DashboardAdmin';
import Member from '../Member';
import SignIn from '../../components/auth/SignIn';

const Base = () => {
  const [open, setOpen] = useState(false);
  const Menus = [
    { title: "Dashboard", src: <MdOutlineSpaceDashboard className='w-6 h-6' /> },
    { title: "Accounts", src: <MdOutlineAccountCircle className='w-6 h-6' /> },
    { title: "Events", src: <MdOutlineEvent className='w-6 h-6' /> },
    { title: "Announcements", src: <MdOutlineAnnouncement className='w-6 h-6' /> },
    { title: "Settings", src: <MdOutlineSettings className='w-6 h-6' />, gap: true },
  ];

  return (
    <>
      {/* INI ADALAH SIDEBAR */}
      <div className={`sticky top-0 ${open ? 'w-72' : 'w-20'} duration-300 p-5 pt-8 bg-[#121212] h-screen`}>
        <img src={logoArrowBack} alt="manjaro-white" className={`duration-300 absolute cursor-pointer rounded-full -right-3 top-9 w-7 border-2 bg-white border-[#121212] ${!open && 'rotate-180'}`} onClick={() => setOpen(!open)} />
        <div className='flex gap-x-4 items-center'>
          <img src={logoManjaroWhite} alt="manjaro-white" width={40} className={`cursor-pointer duration-500`} />
          <h1 className={`text-white origin-left font-medium text-xl duration-300 ${!open && 'scale-0'}`}>Portal</h1>
        </div>
        <ul className='pt-6'>
          {Menus.map((menu, index) => (
            <li key={index} className={`text-gray-300 text-sm flex items-center justify-start gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${menu.gap ? 'mt-9' : 'mt-2'} ${index === 0 && 'bg-light-white'}`}>
              <span>{menu.src}</span>
              <span className={`${!open && 'hidden'} origin-left duration-200`}>{menu.title}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* INI ADALAH KONTEN DI SAMPING KANANNYA */}
    </>
  );
};

export default Base;
