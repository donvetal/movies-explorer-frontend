// AuthNav — компонент с навигацией по странице «О проекте».
import React from 'react';
import {Link} from "react-router-dom";
import './AuthNav.css';
import {TEXT} from "../../utils/constants";


function AuthNav() {
  return (
    <nav className="auth-nav">
      <ul className="auth-nav__links">
        <li><Link to="/signup" className="auth-nav__link">{TEXT.registration}</Link></li>
        <li><Link to="/signin" className="auth-nav__link auth-nav__link-btn">{TEXT.login}</Link></li>
      </ul>
    </nav>
  );

}

export default AuthNav;