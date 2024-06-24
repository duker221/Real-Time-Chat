import React from "react";
import Form from "./Form";

import Navigation from "./Navigation";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <div className="d-flex flex-column h-100">
      <Navigation />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <Form />
        </div>
      </div>
    </div>
  );
};

export default Login;
