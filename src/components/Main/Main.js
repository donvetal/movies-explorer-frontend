//Main — компонент страницы «О проекте»
import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";

function Main(props) {
  const {loggedIn} = props;
  return (
    <section className="main">
      <Header loggedIn={loggedIn}/>
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      <Footer/>
    </section>
  );
}

export default Main;
