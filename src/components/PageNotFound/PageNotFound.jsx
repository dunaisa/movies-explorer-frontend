import React from 'react';
import { useHistory } from "react-router";
import './PageNotFound.css';

const PageNotFound = () => {

  const history = useHistory();

  return (
    <div className="error-page">
      <span className="error-page__heading">404</span>
      <span className="error-page__subheading">Страница не найдена</span>
      <button className="error-page__link" onClick={history.goBack()}>Назад</button>

    </div>
  );
}

export default PageNotFound;
