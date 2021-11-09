// NavTab — компонент с навигацией по странице «О проекте».
import React from 'react';
import {Link} from "react-router-dom";
import './NavTab.css';


function NavTab() {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li><Link to="/signup" className="navigation__link">Регистрация</Link></li>
        <li><Link to="/signin" className="navigation__link navigation__link-btn">Войти</Link></li>
      </ul>
    </nav>
  );

}

export default NavTab;