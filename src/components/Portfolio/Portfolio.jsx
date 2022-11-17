import React from 'react';
import './Portfolio.css';
import linkIcon from '../../images/link-icon.svg'

const Portfolio = () => {
  return (
    <div className="portfolio">
      <span className="portfolio__heading">Портфолио</span>
      <ul className="portfolio__items">
        <li className="portfolio__item">
          <a href="https://github.com/dunaisa/how-to-learn" className="portfolio__link-project" target="_blank" rel="noreferrer">
            <span className="portfolio__link-text">Статичный сайт</span>
            <img src={linkIcon} alt="Переход на страницу" className="portfolio__link-icon" />
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/dunaisa/russian-travel" className="portfolio__link-project" target="_blank" rel="noreferrer">
            <span className="portfolio__link-text">Адаптивный сайт</span>
            <img src={linkIcon} alt="Переход на страницу" className="portfolio__link-icon" />
          </a>
        </li>
        <li className="portfolio__item">
          <a href="https://github.com/dunaisa/react-mesto-auth" className="portfolio__link-project" target="_blank" rel="noreferrer">
            <span className="portfolio__link-text">Одностраничное приложение</span>
            <img src={linkIcon} alt="Переход на страницу" className="portfolio__link-icon" />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Portfolio;
