import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const QuitBtn = () => {
  const { t } = useTranslation();
  const handleClick = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <Button type="submit" onClick={handleClick}>
      {t('mainPage.quitBtn')}
    </Button>
  );
};

export default QuitBtn;
