//Register — компонент страницы регистрации.
import React from 'react';
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";
import './Register.css';
import {useFormWithValidation} from "../../hooks/useFormWithValidation";
import {TEXT} from "../../utils/constants";

function Register(props) {
  const {onRegister, message, isSending} = props;
  const {values, handleChange, resetForm, errors, isValid} =
    useFormWithValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const {password, email, name} = values;
    onRegister({password, email, name});
    resetForm();
  };

  return (
    <section className="register">
      <Link to="/" className="register__link">
        <img src={logo} alt={TEXT.projectLogo} className="register__logo"/>
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>

      <form onSubmit={handleSubmit}
            className="register__form">
        <label className="register__input-label" htmlFor="register-name">Имя</label>
        <input onChange={handleChange}
               value={values.name || ""}
               pattern="^[а-яА-ЯёЁa-zA-Z0-9]+$"
               className="register__input"
               type="text"
               name="name"
               id="register-name"
               minLength="2"
               maxLength="40"
               required/>
        <span className="register__input-error" id="register-input-name-error">{errors.name}</span>

        <label className="register__input-label" htmlFor="register-email">{TEXT.email}</label>
        <input onChange={handleChange}
               value={values.email || ""}
               pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
               className="register__input"
               type="email"
               name="email"
               id="register-email"
               minLength="5"
               maxLength="40"
               autoComplete="off"
               required/>
        <span className="register__input-error" id="register-input-email-error">{errors.email}</span>


        <label className="register__input-label" htmlFor="register-password">{TEXT.password}</label>
        <input onChange={handleChange}
               value={values.password || ""}
               className="register__input register__input_password"
               type="password"
               name="password"
               id="register-password"
               minLength="8"
               maxLength="200"
               autoComplete="off"
               required/>
        <span className="register__input-error" id="register-input-password-error">{errors.password}</span>
        <span className="register__input-error">{message}</span>
        <button type="submit"
                disabled={(!isValid) || (isSending)}
                className="register__btn">{TEXT.registration}
        </button>
        <p className="register__text">{TEXT.alreadyRegistered}
          <Link to="/signin" className="register__signin-link">{TEXT.login}</Link>
        </p>

      </form>

    </section>
  );
}

export default Register;

