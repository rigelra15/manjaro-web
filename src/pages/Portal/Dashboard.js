import React, { useState, useEffect } from 'react';
import { Button, Layout, theme } from 'antd';
import { useLocation } from 'react-router-dom';
import './BaseSecond.css';
import Logo from './Logo';
import logoManjaro from '../../assets/logo-manjaro.png';
import MenuList from './MenuList';
import ToggleThemeButton from './ToggleThemeButton';
import { Content } from 'antd/es/layout/layout';
import { FaBars } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const { Header, Sider } = Layout;

const Divider = () => {
  return (
      <hr
          className='mx-5 border-gray-400 rounded-full'
          style={{ borderTop: "1px solid rgb(156 163 175)" }}
      ></hr>
  );
};

const Dashboard = () => {
  const location = useLocation()

  const [darkTheme, setDarkTheme] = useState(() => {
    return JSON.parse(localStorage.getItem('darkTheme')) || false;
  });

  const [collapsed, setCollapsed] = useState(() => {
    return JSON.parse(localStorage.getItem('collapsed')) || false;
  });

  useEffect(() => {
    localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
  }, [darkTheme]);

  useEffect(() => {
    localStorage.setItem('collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const toggleTheme = () => {
    setDarkTheme(!darkTheme);
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <>
      <Layout>
        <Sider
          collapsed={collapsed}
          collapsible
          trigger={null}
          theme={darkTheme ? 'dark' : 'light'}
          className='text-white h-screen'
          style={{ position: 'sticky', top: 0, zIndex: 100, height: '100vh' }} // Tambahkan style untuk membuat Sider tetap di tempat
        >
          <Logo darkTheme={darkTheme} collapsed={collapsed} />
          <Divider />
          <MenuList darkTheme={darkTheme} />
        </Sider>
        <Layout>
          <Header className={`flex justify-between items-center shadow-md ${darkTheme ? colorBgContainer : 'bg-white'} ${darkTheme ? 'text-white' : 'text-black'}`} style={{ padding: 0, position: 'sticky', top: 0, zIndex: 90, }}>
            <div className='flex gap-1 items-center'>
              <Button onClick={() => setCollapsed(!collapsed)} className={`toggle mt-1 ${collapsed ? 'ml-[15px]' : 'ml-[15px]'}`} type='text' icon={collapsed ? <FaBars className={`${darkTheme ? 'text-white' : 'text-black'}`} /> : <FaBars className={`${darkTheme ? 'text-white' : 'text-black'}`} />} />
              {collapsed && (
                <span className='text-xl font-semibold'>
                  {location.pathname === '/portal/dashboard' && ('Dashboard')}
                  {location.pathname === '/portal/account' && ('Account')}
                  {location.pathname === '/portal/events' && ('Events')}
                  {location.pathname === '/portal/announcements' && ('Announcements')}
                  {location.pathname === '/portal/settings' && ('Settings')}
                </span>
              )}
            </div>
            <div className='mr-[15px]'>
              <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
            </div>
          </Header>
          <Content className='p-7 bg-white'>
            here
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;
