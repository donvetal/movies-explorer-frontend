//SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm({searchMovie}) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");

  function onChange(e) {
    setSearchTerm(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!searchTerm) {
      setErrorMessage("Нужно ввести ключевое слово");
      return;
    }

    searchMovie(searchTerm);
  }

  return (
    <section className="search">
      <form className="search-form"
            onSubmit={handleSubmit}>
        <input type="text"
               id="header-search"
               value={searchTerm}
               onChange={onChange}
               minLength="1"
               maxLength="200"
               placeholder="Фильм"
               name="movies"
               className="search-form__input"
               required/>
        <div className="search-form__container">
          <p className="search__input_error">{errorMessage}</p>
          <button type="submit" className="search-form__btn">Найти</button>

        </div>


      </form>
      <FilterCheckbox/>

    </section>
  );
}

export default SearchForm;