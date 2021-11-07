//Header — компонент, который отрисовывает шапку сайта на страницу, понадобятся на каждой из основных страниц
import React from 'react';
import './Header.css';
import logo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";

function Header() {
  return (
    <header className="header">
      <img src={logo} alt="логтип" className="header__logo"/>
      <Navigation/>
    </header>
  )
    ;
}

export default Header;