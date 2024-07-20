import React, { useState, useEffect } from "react";
import {
  Formik, Form, Field, useField
} from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import regImage from "../../img/reg.jpg";
import { regUser } from "../../slices/authSlice";
import { loginSchema } from "../../validate";

const CustomErrorMessage = ({ name }) => {
  const [field, meta] = useField(name);
  return meta.touched && meta.error ? (
    <div className="invalid-tooltip">{meta.error}</div>
  ) : null;
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [usernameError, setUsernameError] = useState(null);
  const { t } = useTranslation();
  useEffect(() => {
    if (error === t("regForm.regError")) {
      setUsernameError(error);
      console.log(error);
    } else {
      setUsernameError(null);
    }
  }, [error, t]);

  return (
    <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
      <div>
        <img
          src={regImage}
          alt={t("loginPage.reg")}
          className="rounded-circle"
        />
      </div>
      <Formik
        initialValues={{ name: "", password: "", confirmPassword: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const resultAction = await dispatch(
              regUser({
                username: values.name,
                password: values.password,
              })
            );

            if (regUser.fulfilled.match(resultAction)) {
              navigate("/");
            } else {
              throw resultAction.payload;
            }
          } catch (regError) {
            if (regError === t("regForm.regError")) {
              setErrors({ name: regError });
            }
            setSubmitting(false);
          }
        }}
        validate={(values) => {
          const validationErrors = {};
          try {
            loginSchema.validateSync(values, { abortEarly: false });
          } catch (err) {
            err.inner.forEach((error) => {
              validationErrors[error.path] = error.message;
            });
          }
          return validationErrors;
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-50">
            <h1 className="text-center mb-4">{t("loginPage.reg")}</h1>
            <div
              className={`form-floating mb-3 ${
                (errors.name && touched.name) || usernameError
                  ? "has-error"
                  : ""
              }`}
            >
              <Field
                placeholder={t("regForm.charactersCount")}
                name="name"
                autoComplete="username"
                id="name"
                className={`form-control ${
                  (errors.name && touched.name) || usernameError
                    ? "is-invalid"
                    : ""
                }`}
              />
              <label htmlFor="name" className="form-label">
                {t("regForm.userName")}
              </label>
              <CustomErrorMessage name="name" />
              {usernameError && (
                <div className="invalid-tooltip">{usernameError}</div>
              )}
            </div>
            <div
              className={`form-floating mb-3 ${
                errors.password && touched.password ? "has-error" : ""
              }`}
            >
              <Field
                placeholder={t("regForm.charasterCountPassword")}
                name="password"
                aria-describedby="passwordHelpBlock"
                type="password"
                id="password"
                className={`form-control ${
                  errors.password && touched.password ? "is-invalid" : ""
                }`}
              />
              <label htmlFor="password">{t("loginPage.password")}</label>
              <CustomErrorMessage name="password" />
              {usernameError && <div className="invalid-tooltip" />}
            </div>
            <div
              className={`form-floating mb-3 ${
                errors.confirmPassword && touched.confirmPassword
                  ? "has-error"
                  : ""
              }`}
            >
              <Field
                placeholder={t("regForm.confirmPassword")}
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                className={`form-control ${
                  errors.confirmPassword && touched.confirmPassword
                    ? "is-invalid"
                    : ""
                }`}
              />
              <label htmlFor="confirmPassword">
                {t("regForm.confirmPassword")}
              </label>
              <CustomErrorMessage name="confirmPassword" />
              {usernameError && <div className="invalid-tooltip" />}
            </div>
            <button type="submit" className="w-100 btn btn-outline-primary">
              {t("regForm.register")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;