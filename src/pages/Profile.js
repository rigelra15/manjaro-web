import React from 'react';
import NavBar from './NavBar';
import { Helmet } from 'react-helmet';

import MaintenanceVid from '../assets/web.mp4'

const Profile = () => {
  return (
    <div>
      <Helmet>
          <title>Profile | Manjaro - Computer Engineering 2022</title>
      </Helmet>
      <NavBar />
      <div className='flex justify-center items-center h-screen flex-col'>
      <video autoPlay loop muted src={MaintenanceVid} width={500} onContextMenu={(e) => e.preventDefault()}></video>
        <h2 className='-mt-10 font-bold text-lg'>We are Under Construction</h2>
        <h3>We will back soon!</h3>
      </div>
    </div>
  );
};

export default Profile;