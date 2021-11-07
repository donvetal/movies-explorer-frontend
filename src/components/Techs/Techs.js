//Techs — компонент с использованными технологиями.
import React from 'react';
import './Techs.css';

function Techs() {
  return (
    <section className="techs" id="techs">
      <h2 className="techs__title">Технологии</h2>
      <h3 className="techs__subtitle"> 7 Технологий</h3>
      <p className="techs__text"> На курсе веб-разработки мы освоили технологии, которые применили в дипломном
        проекте.</p>
      <ul className="techs__list">
        <li className="techs__item">
          <p className="techs__name">HTML</p>
        </li>
        <li className="techs__item">
          <p className="techs__name">CSS</p>
        </li>
        <li className="techs__item">
          <p className="techs__name">JS</p>
        </li>
        <li className="techs__item">
          <p className="techs__name">React</p>
        </li>
        <li className="techs__item">
          <p className="techs__name">Git</p>
        </li>
        <li className="techs__item">
          <p className="techs__name">Express.js</p>
        </li>
        <li className="techs__item">
          <p className="techs__name">mongoDB</p>
        </li>
      </ul>
    </section>

  );
}

export default Techs;