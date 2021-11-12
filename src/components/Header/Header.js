//Header — компонент, который отрисовывает шапку сайта на страницу, понадобятся на каждой из основных страниц
import React from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import logo from '../../images/logo.svg';
import Navigation from "../Navigation/Navigation";
import AuthNav from "../AuthNav/AuthNav";
import profileLogo from "../../images/profile-logo.svg"

// function Header() {
//   return (
//     <header className="header">
//       <Link to="/" className="header__link">
//         <img src={logo} alt="логтип проекта" className="header__logo"/>
//       </Link>
//       <AuthNav/>
//     </header>
//   )
//     ;
// }
//
// export default Header;
function Header(props) {
  const {isLoggedIn = true} = props;
  return (
    <header className={`header ${isLoggedIn ? "" : "header__theme_rose"}`}>
      <Link to="/" className="header__link">
        <img src={logo} alt="логтип проекта" className="header__logo"/>
      </Link>
      {isLoggedIn ? (
        <>
        <Navigation/>
        <Link to="/profile" className="header__profile-link">
          <p className="header__profile-link-text">Аккаунт</p>
          <img className="header__profile-link-logo" src={profileLogo} alt="лого аккаунта"/>
        </Link>
        </>
        ) : (<AuthNav/>)}

    </header>
  )
    ;
}

export default Header;