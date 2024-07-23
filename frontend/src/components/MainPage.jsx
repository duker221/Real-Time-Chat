import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import Navigation from './Navigation';

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
  }, [navigate]);
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
