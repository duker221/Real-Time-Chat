import React from 'react';
import Navigation from './Navigation';
import notFoundSvg from '../img/notFound.svg';

const NotFoundPage = () => (
  <>
    <Navigation />
    <div className="text-center">
      <img src={notFoundSvg} alt="Страница не найдена" className="img-fluid h-25" />
      <h1 className="h4 text-muted">Страница не найдена</h1>
      <p className="text-muted">
        Но вы можете перейти
        <a href="/">на главную страницу</a>
      </p>
    </div>
  </>
);

export default NotFoundPage;
