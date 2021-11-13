//MoviesCard — компонент одной карточки фильма.
import React, {useState} from "react";
import './MovieCard.css';


function MovieCard(props) {
  const {moviesCardsListType, isMovieCardSelect} = props;
  const [isSelect, setIsSelect] = useState(isMovieCardSelect);

  const handleSelectClick = () => {
    setIsSelect(!isSelect);
  };
  return (
    <>
      <li className="movie">
        <div className="movie__container">
          <h2 className="movie__title">{props.text}</h2>
          <p className="movie__time">{props.time}</p>
          {moviesCardsListType === "general" ? (
            <button
              onClick={handleSelectClick}
              type="button"
              className={`movie__btn-select ${isSelect ? "movie__btn-select_active" : ""}`}/>
          ) : (
            <button
              type="button"
              className="movie__btn-delete"/>
          )}

        </div>
        <img className="movie__image" src={props.image} alt="изображение из фильма"/>

      </li>

    </>

  );
}

export default MovieCard;
