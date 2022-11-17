import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="error-page">
      <span className="error-page__heading">404</span>
      <span className="error-page__subheading">Страница не найдена</span>
      <Link className="error-page__link">Назад</Link>

    </div>
  );
}

export default PageNotFound;
