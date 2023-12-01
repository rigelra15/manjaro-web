import { Menu } from 'antd';
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  UserOutlined,
  CalendarOutlined,
  NotificationOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './BaseSecond.css';

const MenuList = ({ darkTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedKeys, setSelectedKeys] = useState([]);

  const paths = {
    home: '/portal/dashboard',
    account: '/portal/account',
    events: '/portal/events',
    announcements: '/portal/announcements',
    settings: '/portal/settings',
  };

  useEffect(() => {
    // Update selected keys based on the current path
    const currentPath = location.pathname;
    const keys = Object.keys(paths).filter((key) => paths[key] === currentPath);
    setSelectedKeys(keys);
  }, [location.pathname, paths]);

  const handleMenuClick = (key) => {
    navigate(paths[key]);
  };

  return (
    <Menu
      theme={darkTheme ? 'dark' : 'light'}
      mode='inline'
      className='menu-bar'
      selectedKeys={selectedKeys}
      onClick={({ key }) => handleMenuClick(key)}
    >
      <Menu.Item key='home' icon={<HomeOutlined />}>
        Dashboard
      </Menu.Item>
      <Menu.Item key='account' icon={<UserOutlined />}>
        Account
      </Menu.Item>
      <Menu.Item key='events' icon={<CalendarOutlined />}>
        Events
      </Menu.Item>
      <Menu.Item key='announcements' icon={<NotificationOutlined />}>
        Announcements
      </Menu.Item>
      <Menu.Item key='settings' icon={<SettingOutlined />}>
        Settings
      </Menu.Item>
    </Menu>
  );
};

export default MenuList;