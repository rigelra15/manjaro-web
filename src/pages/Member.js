import React, { useState } from 'react';
import NavBar from './NavBar';
import members from '../membersData';
import bgMember from '../assets/bgMember20-Black.png';
import { Helmet } from 'react-helmet';
import { FaThList } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import logoWhite from '../assets/logoWhite.png';

const getBackgroundColor = (id) => {
  const colors = ['bg-[#DC143C]', 'bg-[#49B8D3]', 'bg-[#FFD801]', 'bg-[#0066CC]'];
  return colors[id % colors.length];
};

const Member = () => {
  const [isGrid, setIsGrid] = useState(true);

  const toggleView = () => {
    setIsGrid((prevIsGrid) => !prevIsGrid);
  };

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center">
        <div className={`grid ${isGrid ? 'lg:grid-cols-5' : 'md:grid-cols-2 lg:grid-cols-3'} gap-4 mt-28`}>
          {members.map((member) => (
            <div key={member.id} className={`relative rounded-[20px] overflow-hidden bg-white shadow-xl border-2 ${isGrid ? 'w-72' : 'w-full'}`}>
              {/* LogoWhite at top-left corner */}
              {isGrid ? (
                <>
                  <div className='px-4 pt-4'>
                    <img
                      src={member.photo}
                      alt={member.name}
                      style={{ backgroundImage: `url(${bgMember})`, backgroundSize: 'cover' }}
                      className={`w-[280px] h-[350px] rounded-[12px] object-cover ${getBackgroundColor(member.id)}`}
                    />
                    <img
                      src={logoWhite}
                      alt="Logo"
                      className="absolute top-5 left-5 z-10 w-16 p-2"
                    />
                  </div>
                  <div className="px-6 py-3 text-center flex flex-row items-center justify-center">
                    <div className="flex flex-col items-center h-20 justify-center">
                      <h2 className="text-lg font-semibold break-words">{member.name}</h2>
                      <p className="text-gray-600 break-words">{member.nrp}</p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="px-6 py-3 flex items-center">
                  <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <h2 className="text-lg font-semibold break-words">{member.name}</h2>
                    <p className="text-gray-600 break-words">{member.nrp}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="fixed top-4 right-4 flex mt-36">
        <button
          onClick={toggleView}
          className={`py-2 px-2 ${isGrid ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded mr-2`}
        >
          <BsFillGridFill />
        </button>
        <button
          onClick={toggleView}
          className={`py-2 px-2 ${!isGrid ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded`}
        >
          <FaThList />
        </button>
      </div>
      <Helmet>
        <title>Members | Manjaro - Computer Engineering 2022</title>
      </Helmet>
    </div>
  );
};

export default Member;
