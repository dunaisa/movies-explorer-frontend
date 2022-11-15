import React from 'react';
import './Footer.css';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="footer">

      <span className="footer__heading">Учебный проект Яндекс.Практикум х BeatFilm.</span>

      <div className="footer__content">
        <p className="footer__date">&copy; {year}</p>

        <ul className="footer__items">
          <li className="footer__item">
            <a href="https://practicum.yandex.ru/" className="footer__item-link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          </li>
          <li className="footer__item">
            <a href="https://github.com/dunaisa" className="footer__item-link" target="_blank" rel="noreferrer">Github</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
