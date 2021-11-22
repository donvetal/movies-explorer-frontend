//MoviesCard — компонент одной карточки фильма.
import React, {useState} from "react";
import './MovieCard.css';


function MovieCard(props) {

  const {moviesCardsListType, isMovieCardSelect} = props;
  const [isSelect, setIsSelect] = useState(isMovieCardSelect);
  const MOVIES_IMAGE_BASE_URL = 'https://api.nomoreparties.co';

  const hours = Math.floor(props.card.duration / 60);
  const minutes = props.card.duration- hours * 60;
  const durationStr = hours ? `${hours}ч ${minutes}м` : `${minutes}мин`;

  const handleSelectClick = () => {
    setIsSelect(!isSelect);
  };

  return (
    <>
      <li className="movie">
        <div className="movie__container">
          <h2 className="movie__title">{props.card.nameRU}</h2>
          <p className="movie__time">{durationStr}</p>
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
        {/*<a*/}
        {/*  href={props.card.trailer}*/}
        {/*  target="_blank"*/}
        {/*  rel="noreferrer"*/}
        {/*  className="movie__link"*/}
        {/*> </a>*/}
        <img className="movie__image" src={`${MOVIES_IMAGE_BASE_URL}${props.card.image.url}`} alt={`Кадр из фильма ${props.card.nameRU}`}/>

      </li>

    </>

  );
}

export default MovieCard;
