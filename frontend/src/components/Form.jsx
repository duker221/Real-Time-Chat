import React from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
const Form = () => {
  const [loginError, setError] = useState(false);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      axios
        .post("api/v1/login", {
          username: values.username,
          password: values.password,
        })
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          console.log(response);
          navigate("/");
        })
        .catch((e) => {
          setError(true);
        });
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
    >
      <h1 className="text-center mb-4">Войти</h1>
      <div className="form-floating mb-3">
        <input
          type="username"
          name="username"
          id="username"
          placeholder="Ваш ник"
          required
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
        {loginError ? <div className="invalid-tooltip">Неверные имя пользователя или пароль</div> : null}
      </div>
      <button type="submit" className="w-100 mb-3 btn btn-outline-primary">
        Войти
      </button>
    </form>
  );
};

export default Form;
