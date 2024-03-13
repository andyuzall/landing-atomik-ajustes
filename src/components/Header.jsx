import React, { useState } from 'react'
import style from '../css/Header.css';
import logo from '../media/logo-violeta.png';

const Header = ({ userData }) => {


  return (
    <div className='header'>
        <img 
        src={logo} alt="" />  
        <div>
          <img src={userData && userData.picture} alt="" className='Google-picture' />
        </div>
    </div>
  )
}

export default Header