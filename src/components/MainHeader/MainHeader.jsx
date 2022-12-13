import React from 'react';
import './MainHeader.css';
import logo from '../../images/logo.svg';

const MainHeader = ({ headerClassName, children }) => {



  return (
    <div className={headerClassName}>
      <img src={logo} alt="Логотип" className="" />
      <nav className="">
        {children}
      </nav>




    </div>
  );
}

export default MainHeader;
