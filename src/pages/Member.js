import React, { useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import NavBar from './NavBar';
import members from '../membersData';
import bgMember from '../assets/bgMember20-Black.png';
import { Helmet } from 'react-helmet';
import { FaThList } from 'react-icons/fa';
import { BsFillGridFill } from 'react-icons/bs';
import { FaSortAmountDown, FaSortAmountUp, FaSortAlphaDown, FaSortAlphaUp, FaSortNumericDown, FaSortNumericUp } from "react-icons/fa";
import logoWhite from '../assets/logoWhite.png';

const getBackgroundColor = (id) => {
  const colors = ['bg-[#DC143C]', 'bg-[#49B8D3]', 'bg-[#FFD801]', 'bg-[#0066CC]'];
  return colors[id % colors.length];
};

const Member = () => {
  const [isGrid, setIsGrid] = useState(true);
  const [columnCount, setColumnCount] = useState(5); // Default column count is 2
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortField, setSortField] = useState('nrp'); // Default sorting field is 'id'

  const toggleView = () => {
    setIsGrid((prevIsGrid) => !prevIsGrid);
  };

  const handleColumnCountChange = (e) => {
    setColumnCount(e.target.value);
  };

  const handleSort = (field) => {
    setSortOrder((prevSortOrder) => (field === sortField ? (prevSortOrder === 'asc' ? 'desc' : 'asc') : 'asc'));
    setSortField(field);
  };

  const sortedMembersArray = [...members].sort((a, b) => {
    if (sortField === 'name') {
      return sortOrder === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
    } else if (sortField === 'nrp') {
      return sortOrder === 'asc' ? a.nrp.localeCompare(b.nrp) : b.nrp.localeCompare(a.nrp);
    } else {
      return sortOrder === 'asc' ? a.id - b.id : b.id - a.id;
    }
  });

  return (
    <div>
      <NavBar />
      <div className="flex justify-center items-center">
        <div className={`grid ${isGrid ? `lg:grid-cols-${columnCount} grid-cols-3` : `lg:grid-cols-${columnCount} grid-cols-1`} gap-4 mt-36 mx-5 lg:mx-20 mb-20`}>
          {sortedMembersArray.map((member) => (
            <div key={member.id} className={`relative rounded-[20px] overflow-hidden bg-white shadow-xl border-2 ${isGrid ? '2xl:w-72 lg:w-[250px] w-56' : 'w-full'}`}>
              {isGrid ? (
                <>
                  <div className='px-4 pt-4'>
                    <LazyLoadImage
                      src={member.photo}
                      alt={member.name}
                      effect="blur"
                      className={`w-[280px] lg:h-[300px] 2xl:h-[350px] h-[270px] rounded-[12px] object-cover ${getBackgroundColor(member.id)}`}
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
                    <LazyLoadImage
                      src={member.photo}
                      alt={member.name}
                      effect="blur"
                      className={`w-full h-full object-cover ${getBackgroundColor(member.id)}`}
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
      <div className="fixed top-0 right-8 lg:right-20 flex flex-row gap-3 mt-[86px] bg-white px-2 py-2 lg:py-0 rounded items-center justify-center z-30">
        <label htmlFor="column" className='hidden lg:block'>Columns: </label>
        {isGrid && (
          <select
            className="py-2 px-2 w-full h-full border-none bg-blue-500 text-white rounded hidden lg:block"
            value={columnCount}
            onChange={handleColumnCountChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        )}
        {!isGrid && (
          <select
            className="py-2 px-2 w-full h-full border-none bg-blue-500 text-white rounded hidden lg:block"
            value={columnCount}
            onChange={handleColumnCountChange}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
            <option value={6}>6</option>
          </select>
        )}
        <button
          onClick={toggleView}
          className={`p-2 ${isGrid ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded h-full`}
        >
          <BsFillGridFill className='w-5 h-5' />
        </button>
        <button
          onClick={toggleView}
          className={`p-2 ${!isGrid ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded h-full`}
        >
          <FaThList className='w-5 h-5' />
        </button>
      </div>
      <div className="fixed top-0 left-8 lg:left-20 flex mt-[86px] bg-white px-2 py-0 rounded flex-row justify-center items-center">
        <p className='w-full'>Sort by:</p>
        <select
          className="py-2 px-2 ml-2 border-none bg-blue-500 text-white rounded w-full"
          value={sortField}
          onChange={(e) => setSortField(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="nrp">NRP</option>
        </select>
        <button
          onClick={() => handleSort(sortField)}
          className={`py-2 px-2 ${sortField === 'name' || sortField === 'nrp' ? 'bg-blue-500' : 'bg-gray-300'} text-white rounded ml-2`}
        >
          {sortField === 'name' && (sortOrder === 'asc' ? <FaSortAlphaDown className='w-5 h-5' /> : <FaSortAlphaUp className='w-5 h-5' />)}
          {sortField === 'nrp' && (sortOrder === 'asc' ? <FaSortNumericDown className='w-5 h-5' /> : <FaSortNumericUp className='w-5 h-5' />)}
        </button>
      </div>
      <Helmet>
        <title>Members | Manjaro - Computer Engineering 2022</title>
      </Helmet>
    </div>
  );
};

export default Member;