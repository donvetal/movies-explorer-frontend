//Обратите внимание на фильтр с чекбоксом «Только короткометражки».
import React from "react";
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className="search-form__toggle-switch-container">
      <label className="search-form__toggle-switch-label"
             htmlFor="search-form__toggle-switch"
      >
        <input type="checkbox"
               defaultChecked={true}
               className="search-form__toggle-switch-checkbox"
               name="search-form__toggle-switch"
               id="search-form__toggle-switch"/>
        <span className="search-form__toggle-switch"/>
      </label>
      <p className="search-form__toggle-switch-text"> Короткометражки</p>


    </div>
  );
}

export default FilterCheckbox;
