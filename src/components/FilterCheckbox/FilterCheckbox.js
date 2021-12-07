//Обратите внимание на фильтр с чекбоксом «Только короткометражки».
import React, {useState} from "react";
import './FilterCheckbox.css';
import {TEXT} from '../../utils/constants';

function FilterCheckbox(props) {
  const {onCheckboxToggle} = props;
  const [isChecked, setChecked] = useState(false);

  function onToggle(event) {
    onCheckboxToggle(!isChecked);
    setChecked(event.target.checked);
  }

  return (
    <div className="search-form__toggle-switch-container">
      <label className="search-form__toggle-switch-label"
             htmlFor="search-form__toggle-switch"
      >
        <input type="checkbox"
               defaultChecked={isChecked}
               onChange={(e) => onToggle(e)}
               className="search-form__toggle-switch-checkbox"
               name="search-form__toggle-switch"
               id="search-form__toggle-switch"/>
        <span className="search-form__toggle-switch"/>
      </label>
      <p className="search-form__toggle-switch-text">{TEXT.shortFilms}</p>


    </div>
  );
}

export default FilterCheckbox;
