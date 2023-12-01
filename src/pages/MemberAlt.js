import React, { useState, useEffect } from 'react';
import { Button, Layout, theme } from 'antd';
import './BaseSecond.css';
import Logo from './Logo';
import logoManjaro from '../../assets/logo-manjaro.png';
import MenuList from './MenuList';
import ToggleThemeButton from './ToggleThemeButton';
import { IoIosArrowBack } from 'react-icons/io';
import { Content } from 'antd/es/layout/layout';
import SignIn from '../../components/auth/SignIn';
import { FaBars } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';

const { Header, Sider } = Layout;

const Dashboard = () => {
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
        <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme ? 'dark' : 'light'} className='text-white h-screen'>
          <Logo darkTheme={darkTheme} collapsed={collapsed} />
          <MenuList darkTheme={darkTheme} />
        </Sider>
        <Layout>
          <Header className='flex justify-between items-center' style={{ padding: 0, background: colorBgContainer }}>
            <div className='flex gap-1 items-center'>
              <Button onClick={() => setCollapsed(!collapsed)} className={`toggle mt-2 ${collapsed ? 'ml-[15px]' : 'ml-[15px]'}`} type='text' icon={collapsed ? <FaBars /> : <FaBars />} />
              <LazyLoadImage src={logoManjaro} alt='logo-manjaro' effect='blur' className='w-full h-7' />
            </div>
            <div className='mr-[15px]'>
              <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
            </div>
          </Header>
          <Content>
            hhhh
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default Dashboard;