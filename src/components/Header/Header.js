//Header — компонент, который отрисовывает шапку сайта на страницу, понадобятся на каждой из основных страниц
import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';
import NavTab from "../NavTab/NavTab";

function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link">
        <img src={logo} alt="логтип проекта" className="header__logo"/>
      </Link>
      <NavTab/>
    </header>
  )
    ;
}

export default Header;