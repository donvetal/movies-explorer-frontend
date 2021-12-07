//Navigation — компонент, который отвечает за меню навигации на сайте, понадобятся на каждой из основных страниц
import React from 'react';
import {NavLink} from "react-router-dom";
import './Navigation.css';
import {TEXT} from "../../utils/constants";


function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/movies" activeClassName="navigation__link_active"
               className="navigation__link">{TEXT.movies}</NavLink>
      <NavLink to="/saved-movies" activeClassName="navigation__link_active"
               className="navigation__link">{TEXT.savedMovies}</NavLink>
    </nav>
  );

}

export default Navigation;