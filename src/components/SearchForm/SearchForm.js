//SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import {MESSAGES} from '../../utils/constants';

function SearchForm({searchMovies, setIsChecked, resetMessage}) {
  const [searchKeyWord, setSearchKeyWord] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(false);


  function onChange(e) {
    setSearchKeyWord(e.target.value);
  }

  function handleToggleCheckbox(checked) {
    setIsShortMovies(checked);
    setIsChecked(!isShortMovies);
    setErrorMessage("");
    resetMessage();
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (searchKeyWord) {
      searchMovies(searchKeyWord);
      setErrorMessage("");
    } else {
      setErrorMessage(MESSAGES.searchVoidMessage);
      ;
    }
    return;
  }


  return (
    <section className="search">
      <form className="search-form"
            onSubmit={handleSubmit}>

        <input type="text"
               id="header-search"
               value={searchKeyWord}
               onChange={onChange}
               minLength="1"
               maxLength="200"
               placeholder="Фильм"
               name="movies"
               className="search-form__input"
               autoComplete="off"/>

        <div className="search-form__container">
          <button type="submit" className="search-form__btn">Найти</button>

        </div>


      </form>
      <FilterCheckbox onCheckboxToggle={handleToggleCheckbox}/>
      <p className="search__input_error">{errorMessage}</p>
    </section>
  );
}

export default SearchForm;