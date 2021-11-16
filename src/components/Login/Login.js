//Login — компонент страницы авторизации.
import React from "react";
import './Login.css';
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";

function Login() {
  return (
    <section className="login">
      <Link to="/" className="login__link">
        <img src={logo} alt="логтип проекта" className="login__logo"/>
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form className="login__form">

        <label className="login__input-label" htmlFor="login-email">E-mail</label>
        <input className="login__input"
               type="email"
               name="login-email"
               id="login-email"
               required/>
        <span className="login__input-error" id="login-input-email-error">{''}</span>


        <label className="login__input-label" htmlFor="login-password">Пароль</label>
        <input className="login__input"
               type="password"
               name="login-password"
               id="login-password"
               required/>
        <span className="login__input-error" id="login-input-password-error">{''}</span>

        <button type="submit"
                className="login__btn">Войти
        </button>
        <p className="login__text">Ещё не зарегистрированы?
          <Link to="/signup" className="login__signup-link">Регистрация</Link>
        </p>

      </form>
    </section>
  );
}

export default Login;