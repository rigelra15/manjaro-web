import React from 'react'
import { Button } from 'antd'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi'
import './BaseSecond.css'

const ToggleThemeButton = ({ darkTheme, toggleTheme }) => {
  return (
    <div className="toggle-theme-btn">
        <Button onClick={toggleTheme} className='bg-white'>
            {darkTheme ? <HiOutlineSun /> : <HiOutlineMoon />}
        </Button>
    </div>
  )
}

export default ToggleThemeButton