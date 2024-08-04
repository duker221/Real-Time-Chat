import React, { useState, useEffect } from 'react';
import {
  Formik, Form, Field, useField,
} from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import regImage from '../../img/reg.jpg';
import { regUser } from '../../slices/authSlice';

const CustomErrorMessage = ({ name }) => {
  const [field, meta] = useField(name); // eslint-disable-line
  return meta.touched && meta.error ? (
    <div className="invalid-tooltip">{meta.error}</div>
  ) : null;
};

const RegistrationForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const [apiError, setApiError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    if (error && error.message === 'Username already exists') {
      setApiError(t('regForm.regError'));
    } else {
      setApiError(null);
    }
  }, [error, t]);

  const loginSchema = yup.object().shape({
    name: yup
      .string()
      .trim()
      .required(t('validation.required'))
      .min(3, t('regForm.charactersCount'))
      .max(20, t('validation.maxCount')),
    password: yup
      .string()
      .required(t('validation.required'))
      .min(6, t('validation.minCountPass')),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], t('validation.matchPass'))
      .required(t('validation.matchPass')),
  });

  return (
    <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
      <div>
        <img
          src={regImage}
          alt={t('loginPage.reg')}
          className="rounded-circle"
        />
      </div>
      <Formik
        initialValues={{ name: '', password: '', confirmPassword: '' }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting, setErrors }) => {
          try {
            const resultAction = await dispatch(
              regUser({
                username: values.name,
                password: values.password,
              }),
            );

            if (regUser.fulfilled.match(resultAction)) {
              navigate('/');
            } else {
              throw new Error(resultAction.error.message || 'Unknown error');
            }
          } catch (regError) {
            const errorMessage = regError.message === 'Username already exists'
              ? t('regForm.regError')
              : t('regForm.regErrors');

            setErrors({
              name: '',
              password: '',
              confirmPassword: errorMessage,
            });
            setApiError(errorMessage);
            setSubmitting(false);
          }
        }}
        validate={(values) => {
          const validationErrors = {};
          try {
            loginSchema.validateSync(values, { abortEarly: false });
          } catch (err) {
            err.inner.forEach((error) => { // eslint-disable-line
              validationErrors[error.path] = error.message;
            });
          }
          return validationErrors;
        }}
      >
        {({ errors, touched }) => (
          <Form className="w-50">
            <h1 className="text-center mb-4">{t('loginPage.reg')}</h1>
            <div
              className={`form-floating mb-3 ${
                (errors.name && touched.name) || apiError ? 'has-error' : ''
              }`}
            >
              <Field
                placeholder={t('regForm.charactersCount')}
                name="name"
                autoComplete="username"
                id="name"
                className={`form-control ${
                  (errors.name && touched.name) || apiError
                    ? 'is-invalid'
                    : ''
                }`}
              />
              <label htmlFor="name" className="form-label">
                {t('regForm.userName')}
              </label>
              <CustomErrorMessage name="name" />
            </div>
            <div
              className={`form-floating mb-3 ${
                (errors.password && touched.password) || apiError ? 'has-error' : ''
              }`}
            >
              <Field
                placeholder={t('regForm.charasterCountPassword')}
                name="password"
                aria-describedby="passwordHelpBlock"
                type="password"
                id="password"
                className={`form-control ${
                  (errors.password && touched.password) || apiError
                    ? 'is-invalid'
                    : ''
                }`}
              />
              <label htmlFor="password">{t('loginPage.password')}</label>
              <CustomErrorMessage name="password" />
            </div>
            <div
              className={`form-floating mb-3 ${
                (errors.confirmPassword && touched.confirmPassword) || apiError ? 'has-error' : ''
              }`}
            >
              <Field
                placeholder={t('regForm.confirmPassword')}
                name="confirmPassword"
                type="password"
                id="confirmPassword"
                className={`form-control ${
                  (errors.confirmPassword && touched.confirmPassword) || apiError
                    ? 'is-invalid'
                    : ''
                }`}
              />
              <label htmlFor="confirmPassword">
                {t('regForm.confirmPassword')}
              </label>
              <CustomErrorMessage name="confirmPassword" />
              {apiError && <div className="invalid-tooltip">{apiError}</div>}
            </div>
            <button type="submit" className="w-100 btn btn-outline-primary">
              {t('regForm.register')}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegistrationForm;
