//Register — компонент страницы регистрации.
import React from 'react';
import logo from "../../images/logo.svg";
import {Link} from "react-router-dom";
import './Register.css';

function Register() {
  return (
    <section className="register">
      <Link to="/" className="register__link">
        <img src={logo} alt="логтип проекта" className="register__logo"/>
      </Link>
      <h1 className="register__title">Добро пожаловать!</h1>
      <form className="register__form">
        <label className="register__input-label" htmlFor="register-name">Имя</label>
        <input className="register__input"
               type="text"
               name="register-name"
               id="register-name"
               required/>
        <span className="register__input-error" id="register-input-name-error">{''}</span>

        <label className="register__input-label" htmlFor="register-email">E-mail</label>
        <input className="register__input"
               type="email"
               name="register-email"
               id="register-email"
               required/>
        <span className="register__input-error" id="register-input-email-error">{''}</span>


        <label className="register__input-label" htmlFor="register-password">Пароль</label>
        <input className="register__input register__input_password"
               type="password"
               name="register-password"
               id="register-password"
               required/>
        <span className="register__input-error" id="register-input-password-error">Что-то пошло не так...</span>

        <button type="submit"
                className="register__btn">Зарегистрироваться
        </button>
        <p className="register__text">Уже зарегистрированы?
          <Link to="/signin" className="register__signin-link">Войти</Link>
        </p>

      </form>
    </section>
  );
}

export default Register;
