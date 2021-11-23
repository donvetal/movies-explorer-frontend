//MoviesCard — компонент одной карточки фильма.
import React, {useState} from "react";
import './MovieCard.css';
import {MOVIES_IMAGE_URL} from "../../utils/constants"


function MovieCard(props) {

  const {moviesCardsListType, isMovieCardSelect, card} = props;
  const [isSelect, setIsSelect] = useState(isMovieCardSelect);


  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration - hours * 60;
  const durationStr = hours ? `${hours}ч ${minutes}м` : `${minutes}мин`;

  const handleSelectClick = () => {
    setIsSelect(!isSelect);
  };

  const handleClickImg = () => {
    window.open(card.trailerLink);
  };

  return (
    <>
      <li className="movie">
        <div className="movie__container">
          <h2 className="movie__title">{card.nameRU}</h2>
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
        <img onClick={handleClickImg} className="movie__image" src={`${MOVIES_IMAGE_URL}${card.image.url}`}
             alt={`Кадр из фильма ${card.nameRU}`}/>

      </li>

    </>

  );
}

export default MovieCard;
