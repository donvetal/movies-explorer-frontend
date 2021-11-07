//Navigation — компонент, который отвечает за меню навигации на сайте, понадобятся на каждой из основных страниц
import React from 'react';
import {Link} from "react-router-dom";
import './Navigation.css';


function Navigation() {
  return (
    <nav className="navigation">
      <ul className="navigation__links">
        <li><Link to="/signun" className="navigation__link">Регистрация</Link></li>
        <li><Link to="/signin" className="navigation__link navigation__link-btn">Войти</Link></li>
      </ul>
    </nav>
  );

}

export default Navigation;