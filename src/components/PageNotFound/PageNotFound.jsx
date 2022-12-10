import React, { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import './PageNotFound.css';

const PageNotFound = () => {

  const history = useHistory();

  const comeBack = () => {
    history.length > 1 ? history.goBack() : history.push('/');
  }

  return (
    <div className="error-page">
      <span className="error-page__heading">404</span>
      <span className="error-page__subheading">Страница не найдена</span>
      <button className="error-page__link" type="button" onClick={comeBack}>Назад</button>

    </div>
  );
}

export default PageNotFound;
