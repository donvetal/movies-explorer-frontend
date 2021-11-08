//Footer — презентационный компонент, который отрисовывает подвал, который понадобится на каждой из основных страниц
import React from "react";
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__text">Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <nav className="footer__content">
        <p className="footer__date">&copy;2021</p>
        <ul className="footer__links">
          <li className="footer__link-content">
            <a href="https://practicum.yandex.ru" className="footer__link" target="_blank"
               rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__link-content">
            <a href="https://github.com/donvetal" className="footer__link" target="_blank"
               rel="noreferrer">Github</a>
          </li>
          <li className="footer__link-content">
            <a href="https://developers.facebook.com/docs/javascript" className="footer__link" target="_blank"
               rel="noreferrer">Facebook</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
}

export default Footer;