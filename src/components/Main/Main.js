//Main — компонент страницы «О проекте»
import React from "react";
import Promo from "../Promo/Promo";
import AboutProject from "../AboutProject/AboutProject";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";

function Main() {
  return (
    <section className="main">
      <Promo/>
      <AboutProject/>
      <Techs/>
      <AboutMe/>
      {/*<NavBar/>*/}
    </section>
  );
}

export default Main;
