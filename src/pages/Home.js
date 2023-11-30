import React from 'react';
import NavBar from './NavBar';
import { Helmet } from 'react-helmet';
import MaintenanceVid from '../assets/web.mp4'

const Home = () => {
  return (
    <>
      <div>
        <Helmet>
            <title>Manjaro - Computer Engineering 2022</title>
        </Helmet>
        <NavBar />
        <div className='antialiased flex justify-center items-center h-screen flex-col'>
          <video className='antialiased' autoPlay loop muted src={MaintenanceVid} width={500}></video>
          <h2 className='-mt-10 font-bold text-lg'>We are Under Construction</h2>
          <h3>We will back soon!</h3>
        </div>
      </div>
    </>
  );
};

export default Home;