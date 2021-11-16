//Portfolio — компонент со ссылками на другие проекты.
import React from "react";
import './Portfolio.css';
import profileArrow from '../../images/profile-arrow.svg';

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__title">Портфолио</h3>
      <ul className="portfolio__links">
        <li className="portfolio__links-content">
          <a
            href="https://donvetal.github.io/how-to-learn"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer">
            <p className="portfolio__link-text">Статичный сайт</p>
            <img src={profileArrow} alt="картинка стрелки" className="portfolio__link-arrow"/>
          </a>
        </li>
        <li className="portfolio__links-content">
          <a
            href="https://donvetal.github.io/russian-travel"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer">
            <p className="portfolio__link-text">Адаптивный сайт</p>
            <img src={profileArrow} alt="картинка стрелки" className="portfolio__link-arrow"/>
          </a>
        </li>
        <li className="portfolio__links-content">
          <a
            href="https://vitaliymontana.students.nomoredomains.club"
            className="portfolio__link"
            target="_blank"
            rel="noreferrer">
            <p className="portfolio__link-text">Одностраничное приложение</p>
            <img src={profileArrow} alt="картинка стрелки" className="portfolio__link-arrow"/>
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;