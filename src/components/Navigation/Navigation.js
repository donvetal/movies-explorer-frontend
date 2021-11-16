//Navigation — компонент, который отвечает за меню навигации на сайте, понадобятся на каждой из основных страниц
import React from 'react';
import {NavLink} from "react-router-dom";
import './Navigation.css';


function Navigation() {
  return (
    <nav className="navigation">
      <NavLink to="/movies" activeClassName="navigation__link_active" className="navigation__link">Фильмы</NavLink>
      <NavLink to="/saved-movies" activeClassName="navigation__link_active" className="navigation__link">Сохраненные
        фильмы</NavLink>
    </nav>
  );

}

export default Navigation;