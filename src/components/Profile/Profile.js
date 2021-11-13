//Profile — компонент страницы изменения профиля.
import React from "react";
import './Profile.css';
import Header from "../Header/Header";
import {Link} from "react-router-dom";

function Profile() {
  return (
    <>
      <Header/>
      <section className="profile">
        <h1 className="profile__title">Привет, Виталий!</h1>
        <form className="profile__form">

          <div className="profile__input-container">
            <label className="profile__input-label" htmlFor="profile-name">Имя</label>
            <input className="profile__input"
                   placeholder="Имя"
                   value={"Виталий"}
                   type="text"
                   name="profile-name"
                   id="profile-name"
                   required/>
          </div>

          <div className="profile__input-container">
            <label className="profile__input-label" htmlFor="profile-email">{"E-mail"}</label>
            <input className="profile__input"
                   placeholder="email"
                   value={"pochta@yandex.ru"}
                   type="email"
                   name="profile-email"
                   id="profile-email"
                   required/>
          </div>
          <button type="submit"
                  className="profile__btn">Редактировать
          </button>

        </form>
        <Link to="/" className="profile__link">Выйти из аккаунта</Link>
      </section>
    </>
  );

}

export default Profile;
