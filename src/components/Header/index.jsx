import React from 'react';
import './styles.scss';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="header__logo">
        <Link to="/">
          <span>LOGO</span>
        </Link>
        <Link to="/movie">cadastro</Link>
      </nav>
    </header>
  );
};

export default Header;
