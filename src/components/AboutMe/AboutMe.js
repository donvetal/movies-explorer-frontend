//AboutMe — компонент с информацией о студенте.
import React from "react";
import './AboutMe.css';
import myPhoto from '../../images/about-me.jpeg';
import Portfolio from "../Portfolio/Portfolio";

function AboutMe() {
  return (
    <section className="about-me" id="about-me">
      <h3 className="about-me__title">Студент</h3>
      <article className="about-me__columns">
        <div className="about-me__column">
          <div className="about-me__container">
            <h2 className="about-me__author">Виталий</h2>
            <p className="about-me__info">Фронтенд-разработчик</p>
            <blockquote className="about-me__quote">Я родился и живу в Москве. Я люблю путешествовать, слушать музыку,
              смотреть
              кино. Интересуюсь современными IT-технологиями. А ещё увлекаюсь спортом.
            </blockquote>
          </div>
          <ul className="about-me__links">
            <li className="about-me__link-content">
              <a
                href="https://developers.facebook.com/docs/javascript"
                className="about-me__link"
                target="_blank"
                rel="noreferrer">
                Facebook
              </a>
            </li>
            <li className="about-me__link-content">
              <a
                href="https://github.com/donvetal"
                className="about-me__link"
                target="_blank"
                rel="noreferrer">
                Github
              </a>
            </li>
          </ul>
        </div>
        <div className="about-me__column">
          <img className="about-me__photo" src={myPhoto} alt="моё фото"/>
        </div>
      </article>
      <Portfolio/>
    </section>
  );
}

export default AboutMe;