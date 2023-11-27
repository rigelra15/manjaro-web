import React from 'react';
import NavBar from './NavBar';
import { Helmet } from 'react-helmet';
import UnderConst from '../assets/underconst/underconst.jpg'

const Profile = () => {
  return (
    <div>
      <Helmet>
          <title>Profile | Manjaro - Computer Engineering 2022</title>
      </Helmet>
      <NavBar />
      <div className='flex justify-center items-center h-screen'>
        <img src={UnderConst} alt="under-construction-icon" width={700} />
      </div>
    </div>
  );
};

export default Profile;