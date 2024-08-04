import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import routes from '../routes';
import myImage from '../img/hello.jpg';
import { loginUser } from '../slices/authSlice';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const [loginError, setError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      try {
        await dispatch(
          loginUser({
            username: values.username,
            password: values.password,
          }),
        ).unwrap();

        navigate(routes.chat);
      } catch (e) {
        if (e.statusCode === 401) {
          setError(true);
        } else {
          toast.error(t('toast.errorNetwork'));
        }
      }
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
            <h1 className="text-center mb-4">{t('loginPage.enter')}</h1>
            <div className="form-floating mb-3">
              <input
                name="username"
                autoComplete="username"
                required
                placeholder={t('loginPage.nickname')}
                id="username"
                onChange={formik.handleChange}
                value={formik.values.username}
                className={`form-control ${loginError ? 'is-invalid' : ''}`}
              />
              <label htmlFor="username">{t('loginPage.nickname')}</label>
            </div>
            <div className="form-floating mb-4">
              <input
                type="password"
                name="password"
                id="password"
                placeholder={t('loginPage.password')}
                required
                onChange={formik.handleChange}
                value={formik.values.password}
                className={`form-control ${loginError ? 'is-invalid' : ''}`}
              />
              <label htmlFor="password">{t('loginPage.password')}</label>
              {loginError ? (
                <div className="invalid-tooltip">
                  {t('loginPage.loginError')}
                </div>
              ) : null}
            </div>
            <button
              type="submit"
              className="w-100 mb-3 btn btn-outline-primary"
            >
              {t('loginPage.enter')}
            </button>
          </form>
        </div>

        <div className="card-footer p-4">
          <div className="text-center">
            <span>{t('loginPage.withoutAcc')}</span>
            &nbsp;
            <a href={routes.signUpPage}>{t('loginPage.reg')}</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
