//Profile — компонент страницы изменения профиля.
import React, {useContext, useEffect} from "react";
import './Profile.css';
import Header from "../Header/Header";
import {useFormWithValidation} from "../../hooks/useFormWithValidation";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import {TEXT} from "../../utils/constants";

function Profile(props) {
  const {onSignOut, loggedIn, onUpdateProfile, message, isSending, resetMessage} = props;
  const currentUser = useContext(CurrentUserContext);


  const {values, handleChange, resetForm, errors, isValid} =
    useFormWithValidation();

  useEffect(() => {
    resetForm(currentUser, {}, true);
  }, [resetForm, currentUser]);

  useEffect(() => {
    resetMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSubmit = (e) => {
    e.preventDefault();
    const {name, email} = values;
    onUpdateProfile({email, name});

  };

  return (
    <>
      <Header loggedIn={loggedIn}/>
      <section className="profile">
        <h1 className="profile__title">{`Привет, ${currentUser.name}!`}</h1>
        <form onSubmit={handleSubmit}
              className="profile__form">

          <div className="profile__input-container">
            <label className="profile__input-label" htmlFor="profile-name">Имя</label>
            <input onChange={handleChange}
                   value={values.name || currentUser.name}
                   pattern="^[а-яА-ЯёЁa-zA-Z0-9]+$"
                   className="profile__input"
                   placeholder="Имя"
                   type="text"
                   name="name"
                   id="profile-name"
                   autoComplete="off"
                   minLength="2"
                   maxLength="40"
                   required/>

          </div>
          <span className="profile__input-error" id="profile-input-name-error">{errors.name}</span>

          <div className="profile__input-container">
            <label className="profile__input-label" htmlFor="profile-email">{"E-mail"}</label>
            <input onChange={handleChange}
                   value={values.email || currentUser.email}
                   pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                   className="profile__input"
                   placeholder="E-mail"
                   type="email"
                   name="email"
                   id="profile-email"
                   autoComplete="off"
                   minLength="5"
                   maxLength="40"
                   required/>

          </div>
          <span className="profile__input-error" id="profile-input-email-error">{errors.email}</span>
          <span className="profile__input-error">{message}</span>
          <button type="submit"
                  disabled={(!isValid) || (values.email === currentUser.email && values.name === currentUser.name) || (isSending)}
                  className="profile__btn">{TEXT.buttonEdit}
          </button>

        </form>
        <button onClick={onSignOut}
                type="button"
                className="profile__btn-signout">{TEXT.buttonSignOut}
        </button>
      </section>
    </>
  );

}

export default Profile;
