import React from 'react';
import './Portfolio.css';
import linkIcon from '../../images/link-icon.svg'

const Portfolio = () => {
  return (
    <div className="portfolio">
      <span className="portfolio__heading">Портфолио</span>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a href="#" className="portfolio__link-project" target="_blank">Статичный сайт</a>
          <img src={linkIcon} alt="Переход на страницу" className="portfolio__link-icon" />
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/dunaisa/russian-travel" className="portfolio__link-project" target="_blank" rel="noreferrer">Адаптивный сайт</a>
          <img src={linkIcon} alt="Переход на страницу" className="portfolio__link-icon" />
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/dunaisa/react-mesto-auth" className="portfolio__link-project" target="_blank" rel="noreferrer">Одностраничное приложение</a>
          <img src={linkIcon} alt="Переход на страницу" className="portfolio__link-icon" />
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
