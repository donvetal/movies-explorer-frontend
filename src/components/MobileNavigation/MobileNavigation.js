import React, {useState} from "react";
import './MobileNavigation.css';
import {Link, NavLink} from "react-router-dom";
import profileLogo from "../../images/profile-logo.svg";
import {TEXT} from "../../utils/constants";

function MobileNavigation() {
  const [isBurgerMenu, setBurgerMenu] = useState(false);
  const handleClick = () => {
    setBurgerMenu(!isBurgerMenu);
  };

  return (
    <nav className="mobile-navigation">

      <button onClick={handleClick}
              type="button"
              className={`mobile-navigation__btn ${isBurgerMenu ? "mobile-navigation__btn-pressed" : ""}`}
              id="nav-icon1">
        <span className="mobile-navigation__bar"></span>
        <span className="mobile-navigation__bar"></span>
        <span className="mobile-navigation__bar"></span>
      </button>
      {isBurgerMenu && (
        <div className="mobile-navigation__cover">
          <ul className="mobile-navigation__menu">
            <ul className="mobile-navigation__links">


              <li className="mobile-navigation__link-content">
                <NavLink to="/"
                         exact
                         activeClassName="mobile-navigation__link_active"
                         className="mobile-navigation__link">{TEXT.main}</NavLink>
              </li>
              <li className="mobile-navigation__link-content">
                <NavLink to="/movies"
                         activeClassName="mobile-navigation__link_active"
                         className="mobile-navigation__link">{TEXT.movies}</NavLink>
              </li>
              <li className="mobile-navigation__link-content">
                <NavLink to="/saved-movies"
                         activeClassName="mobile-navigation__link_active"
                         className="mobile-navigation__link">{TEXT.savedMovies}</NavLink></li>

            </ul>
            <li><Link to="/profile" className="mobile-navigation__profile-btn">
              <p className="mobile-navigation__profile-text">{TEXT.account}</p>
              <img className="mobile-navigation__profile-logo" src={profileLogo} alt="лого аккаунта"/>
            </Link></li>
          </ul>
        </div>
      )

      }


    </nav>

  );
}

export default MobileNavigation;