import React from 'react';
import "./AboutMe.css";
import Portfolio from '../Portfolio/Portfolio';

const AboutMe = () => {
  return (
    <div className="about-me section">
      <h2 className="section__title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__content">
          <div className="about-me__info">
            <span className="about-me__heading">Елизавета</span>
            <span className="about-me__subheading">Фронтенд-разработчик, 25 лет</span>
            <p className="about-me__description">Я родилась и живу в Сергиевом Посаде, закончила факультет экономики РГСУ. Я люблю слушать музыку, а ещё увлекаюсь чтением и фитнесом. Веб-разработка привлекла тем, что результаты работы можно визуально оценить и протестировать по мере выполнения задач. Также явным плюсом для меня была возможность удаленной работы - отсутсвие модели &#171;дом-работа-дом&#187;, ощущение свободы и уменьшение шансов выгорания или усталости. Готова прикладывать все усилия, чтобы быть полезным звеном организации.</p>
            <a href="https://github.com/dunaisa" className="about-me__githab-link">Github</a>
          </div>
          <img src="" alt="Фото" className="about-me__photo" />
        </div>

        <Portfolio />

      </div>
    </div>
  );
}

export default AboutMe;
