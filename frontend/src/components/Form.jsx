import React, { useState } from "react";
import myImage from "../img/hello.jpg";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../slices/authSlice";
const Form = () => {
  const [loginError, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      dispatch(
        loginUser({
          username: values.username,
          password: values.password,
        })
      )
        .unwrap()
        .then((originalPromiseResult) => {
          console.log(originalPromiseResult);
          navigate("/");
        })
        .catch((rejectedValueOrSerializedError) => {
          setError(true);
        });
    },
  });

  return (
    <div className="col-12 col-md-8 col-xxl-6">
      <div className="card shadow-sm">
        <div className="card-body row p-5">
          <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <img src={myImage} alt="" className="rounded-circle" />
          </div>

          <form
            onSubmit={formik.handleSubmit}
            className="col-12 col-md-6 mt-3 mt-mb-0"
          >
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3">
              <input
                name="username"
                autoComplete="username"
                required
                placeholder="Ваш ник"
                id="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className={`form-control ${loginError ? "is-invalid" : ""}`}
              />
              <label htmlFor="username">Ваш ник</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`form-control ${loginError ? "is-invalid" : ""}`}
              />
              <label htmlFor="password">Пароль</label>
              {loginError ? (
                <div className="invalid-tooltip">
                  Неверные имя пользователя или пароль
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
            >
              Войти
            </button>
          </form>
        </div>

        <div className="card-footer p-4">
          <div className="text-center">
            <span>Нет аккаунта?</span> <a href="/signup">Регистрация</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
