import React from 'react';
import { useTranslation } from 'react-i18next';
import Navigation from './Navigation';
import notFoundSvg from '../img/notFound.svg';
import routes from '../routes';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Navigation />
      <div className="text-center">
        <img
          src={notFoundSvg}
          alt={t('notFoundPage.notFound')}
          className="img-fluid h-25"
        />
        <h1 className="h4 text-muted">{t('notFoundPage.notFound')}</h1>
        <p className="text-muted">
          {t('notFoundPage.youCanMove')}
          {'\u00A0'}
          <a href={routes.chat}>{t('notFoundPage.mainPage')}</a>
        </p>
      </div>
    </>
  );
};
export default NotFoundPage;
