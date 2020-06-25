import React from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';

import logo from '../../assets/camera_old.png';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__nav">
        <Link to="/">
          <img src={logo} alt="Logo" />
          <span>LOCADORA</span>
        </Link>
        <Link to="/movie">cadastro</Link>
      </nav>
    </header>
  );
};

export default Header;
