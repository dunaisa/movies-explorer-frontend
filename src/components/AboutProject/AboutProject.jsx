import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <div className="about-project">
      <h2>О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__description">
          <span>Дипломный проект включал 5 этапов</span>
          <span>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</span>
        </div>
        <div className="about-project__description">
          <span>На выполнение диплома ушло 5 недель</span>
          <span>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</span>
        </div>
      </div>
    </div>
  );
}

export default AboutProject;
