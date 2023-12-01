import React from 'react'
import { FireFilled } from '@ant-design/icons'
import logoWhiteManjaro from '../../assets/logoWhite.png'
import logoBlackManjaro from '../../assets/logoBlack.png'

const Logo = ({ darkTheme, collapsed }) => {
  return (
    <div className="logo">
        <div className="logo-icon">
            {darkTheme ? <img src={logoWhiteManjaro} alt="" /> : <img src={logoBlackManjaro} alt="" />}
        </div>
        <span className={`ml-3 ${darkTheme ? 'text-white' : 'text-black'} text-lg font-bold duration-300 ${collapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>myPortal</span>
    </div>
  )
}

export default Logo