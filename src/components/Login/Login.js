//Login — компонент страницы авторизации.
import React from "react";
import './Login.css';
import {Link} from "react-router-dom";
import logo from "../../images/logo.svg";
import {useFormWithValidation} from "../../hooks/useFormWithValidation";
import {TEXT} from "../../utils/constants";

function Login(props) {
  const {onLogin, message, isSending} = props;
  const {values, handleChange, resetForm, errors, isValid} =
    useFormWithValidation();


  const handleSubmit = (e) => {
    e.preventDefault();
    const {password, email} = values;
    onLogin({password, email});
    resetForm();
  };
  return (
    <section className="login">
      <Link to="/" className="login__link">
        <img src={logo} alt="логтип проекта" className="login__logo"/>
      </Link>
      <h1 className="login__title">Рады видеть!</h1>
      <form onSubmit={handleSubmit}
            className="login__form">

        <label className="login__input-label" htmlFor="login-email">E-mail</label>
        <input onChange={handleChange}
               value={values.email || ""}
               pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
               className="login__input"
               type="email"
               name="email"
               id="login-email"
               minLength="5"
               maxLength="40"
               autoComplete="off"
               required/>
        <span className="login__input-error" id="login-input-email-error">{errors.email}</span>


        <label className="login__input-label" htmlFor="login-password">Пароль</label>
        <input onChange={handleChange}
               value={values.password || ""}
               className="login__input"
               type="password"
               name="password"
               id="login-password"
               minLength="8"
               maxLength="200"
               autoComplete="off"
               required/>
        <span className="login__input-error" id="login-input-password-error">{errors.password}</span>
        <span className="login__input-error">{message}</span>
        <button type="submit"
                disabled={(!isValid) || (isSending)}
                className="login__btn">{TEXT.login}
        </button>
        <p className="login__text">{TEXT.notRegisteredYet}
          <Link to="/signup" className="login__signup-link">{TEXT.registration}</Link>
        </p>

      </form>
    </section>
  );
}

export default Login;