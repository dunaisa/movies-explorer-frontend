import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <div className="about-project section">
      <h2 className="section__title">О проекте</h2>
      <div className="about-project__container">
        <div className="about-project__description">
          <span className="about-project__heading">Дипломный проект включал 5 этапов</span>
          <p className="about-project__subheading">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className="about-project__description">
          <span className="about-project__heading">На выполнение диплома ушло 5 недель</span>
          <p className="about-project__subheading">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th className="table__heading table__heading_type_back">1 неделя</th>
            <th className="table__heading table__heading_type_front">4 недели</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table__cell table__cell_type_back">Back-end</td>
            <td className="table__cell table__cell_type_front">Front-end</td>
          </tr>
        </tbody>
      </table>

    </div>
  );
}

export default AboutProject;
