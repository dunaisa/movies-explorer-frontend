import React from 'react';
import './Promo.css';
import PromoImage from '../../images/promo-image.png'


const Promo = () => {
  return (
    <>
      <div className="promo">
        <div className="promo__container">
          <div className="promo__description">
            <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
            <span className="promo__subtitle">Листайте ниже, чтобы узнать больше про этот проект и его создателя.</span>
          </div>
          <img src={PromoImage} alt="Картинка для промо части" className="promo__image" />
        </div>
        <a href="#" className="promo__link">Узнать больше</a>
      </div>
    </>
  );
}

export default Promo;
