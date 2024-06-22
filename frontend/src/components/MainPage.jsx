import React from "react";
import Form from "./Form";
import myImage from "../img/hello.jpg";
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
    <>
      <Navigation />
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img src={myImage} alt="" className="rounded-circle" />
                </div>

                <Form />
              </div>

              <div className="card-footer p-4">
                <div className="text-center">
                  <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
