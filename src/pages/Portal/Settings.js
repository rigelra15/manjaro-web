import React, { useState, useEffect } from 'react';
import { Button, Layout, theme } from 'antd';
import './BaseSecond.css';
import Logo from './Logo';
import MenuList from './MenuList';
import ToggleThemeButton from './ToggleThemeButton';
import { IoIosArrowBack } from 'react-icons/io';

const { Header, Sider } = Layout;

const Settings = () => {
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
        <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme ? 'dark' : 'light'} className='sidebar'>
          <Logo darkTheme={darkTheme} collapsed={collapsed} />
          <MenuList darkTheme={darkTheme} />
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
        </Sider>
        <div className='bg-white'>
          <Layout>
            <Header className='z-99' style={{ padding: 0, background: colorBgContainer }}>
              <button
                onClick={() => setCollapsed(!collapsed)}
                className='absolute -ml-3 p-1 mt-[70px] text-black bg-white border-2 border-gray-400 rounded-full shadow-md'
              >
                {collapsed ? <IoIosArrowBack className='rotate-180 w-5 h-5' /> : <IoIosArrowBack className='rotate-0 w-5 h-5' />}
              </button>
            </Header>
          </Layout>
        </div>
      </Layout>
    </>
  );
};

export default Settings;
