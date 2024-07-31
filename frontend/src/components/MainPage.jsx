import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Form from './Form';
import Navigation from './Navigation';
import routes from '../routes';

const Login = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!token) {
      navigate(routes.loginPage);
    }
  }, [navigate, token]);
  return (
    <>
      <Navigation />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <Form />
        </div>
      </div>
    </>
  );
};

export default Login;
