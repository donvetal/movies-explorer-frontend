/*Promo — компонент с вёрсткой баннера страницы «О проекте».*/
import React from 'react';
import './Promo.css';
import promoImage from '../../images/landing-logo.svg';

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__title">Учебный проект студента факультета Веб-разработки.</h1>
      <img src={promoImage} alt="логотип промо страницы" className="promo__image"/>
    </section>
  );
}

export default Promo;
