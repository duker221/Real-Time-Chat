import React from 'react';
import Navigation from '../Navigation';
import RegistrationForm from './RegForm';

const RegistrationPage = () => (
  <>
    <Navigation />
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  </>
);

export default RegistrationPage;
