import React from "react";
import { Formik, useFormik } from "formik";


const Form = () => {
    const formik = useFormik({
        initialValues: {
            username: '',
            password: ''
        },
        onSubmit: (values) => {
            console.log(JSON.stringify(values, null, 2))
        }
    });



    return (
        <form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
            <h1 className="text-center mb-4">Войти</h1>
            <div className="form-floating mb-3">
                <input type="username" name="username" id="username" placeholder="Ваш ник" required onChange={formik.handleChange} value={formik.values.username} className="form-control"/>
                <label htmlFor="username">Ваш ник</label>
            </div>
            <div className="form-floating mb-4">
                <input type="passwor" name="password" id="passwod" placeholder="Пароль" required  onChange={formik.handleChange} value={formik.values.password} className="form-control"/>
                <label htmlFor="passwod">Пароль</label>
            </div>
            <button type="submit" className="w-100 mb-3 btn btn-outline-primary">Войти</button>
        </form>
    )
}

export default Form