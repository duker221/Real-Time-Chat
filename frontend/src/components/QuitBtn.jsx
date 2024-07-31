import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../slices/authSlice';
import routes from '../routes';

const QuitBtn = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(logoutUser());
    navigate(routes.loginPage);
  };

  return (
    <Button type="submit" onClick={handleClick}>
      {t('mainPage.quitBtn')}
    </Button>
  );
};

export default QuitBtn;
