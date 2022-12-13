import React from 'react';
import './Techs.css'

const Techs = () => {
  return (
    <section className="section techs">
      <h2 className="section__title">Технологии</h2>
      <div className="techs__container">
        <h3 className="techs__heading">7 технологий</h3>
        <span className="techs__subheading">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</span>
        <ul className="techs__items">
          <li className="techs__item">HTML</li>
          <li className="techs__item">CSS</li>
          <li className="techs__item">JS</li>
          <li className="techs__item">React</li>
          <li className="techs__item">Git</li>
          <li className="techs__item">Express.js</li>
          <li className="techs__item">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
