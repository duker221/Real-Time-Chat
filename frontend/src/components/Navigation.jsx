import React from 'react';
import routes from '../routes';

const Navigation = ({ child, token }) => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a className="navbar-brand" href={token ? routes.loginPage : routes.chat}>Hexlet Chat</a>
      {child}
    </div>
  </nav>
);

export default Navigation;
