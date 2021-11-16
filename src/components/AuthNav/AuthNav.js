// AuthNav — компонент с навигацией по странице «О проекте».
import React from 'react';
import {Link} from "react-router-dom";
import './AuthNav.css';


function AuthNav() {
  return (
    <nav className="auth-nav">
      <ul className="auth-nav__links">
        <li><Link to="/signup" className="auth-nav__link">Регистрация</Link></li>
        <li><Link to="/signin" className="auth-nav__link auth-nav__link-btn">Войти</Link></li>
      </ul>
    </nav>
  );

}

export default AuthNav;