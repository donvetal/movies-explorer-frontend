//SearchForm — форма поиска, куда пользователь будет вводить запрос.
import React from 'react';
import './SearchForm.css';
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  return (
    <section className="search">
      <form action="/" method="get" className="search-form">
        <input type="text"
               id="header-search"
               placeholder="Фильм"
               name="movies"
               className="search-form__input"
               required/>
        <div className="search-form__container">
          <button type="submit" className="search-form__btn">Найти</button>

        </div>


      </form>
      <FilterCheckbox/>

    </section>
  );
}

export default SearchForm;