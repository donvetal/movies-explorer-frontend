//SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({searchMovies, setIsChecked}) {
  const [searchKeyWord, setSearchKeyWord] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState(false);

  function onChange(e) {
    setSearchKeyWord(e.target.value);
  }

  function handleToggleCheckbox(checked) {
    setIsShortMovies(checked);
    setIsChecked(!isShortMovies);
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("step1")
    if (!searchKeyWord) {
      setErrorMessage("Нужно ввести ключевое слово");
      return;
    }
    console.log("step2")
    searchMovies(searchKeyWord);
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
               autoComplete="off"
               required/>
        <div className="search-form__container">
          <p className="search__input_error">{errorMessage}</p>
          <button type="submit" className="search-form__btn">Найти</button>

        </div>


      </form>
      <FilterCheckbox onCheckboxToggle={handleToggleCheckbox}/>

    </section>
  );
}

export default SearchForm;