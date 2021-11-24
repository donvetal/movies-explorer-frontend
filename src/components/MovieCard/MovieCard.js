//MoviesCard — компонент одной карточки фильма.
import React, {useEffect, useState} from "react";
import './MovieCard.css';
import {MOVIES_IMAGE_URL} from "../../utils/constants";


function MovieCard(props) {

  const {moviesCardsListType, saveMovie, savedMoviesIds, card, deleteMovie} = props;

  const {
    country,
    director,
    year,
    description,
    image,
    thumbnail,
    nameRU,
    nameEN,
    duration,
    trailer,
    movieId,
  } = card;
  const [isSelect, setIsSelect] = useState(false);


  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration - hours * 60;
  const durationStr = hours ? `${hours}ч ${minutes}м` : `${minutes}мин`;

  const handleSave = () => {
    saveMovie({
      country: country || 'Данные отсутствуют',
      director: director || 'Данные отсутствуют',
      duration: duration || 0,
      year: year || 'Данные отсутствуют',
      description: description || '',
      image: image || 'https://yandex.ru/images/search?text=%D0%9B%D0%B5%D0%B4%D0%BD%D0%B8%D0%BA&nl=1&source=morda',
      trailer: trailer || 'https://youtube.com',
      thumbnail: thumbnail || 'https://yandex.ru/images/search?text' +
        '=%D0%9B%D0%B5%D0%B4%D0%BD%D0%B8%D0%BA&nl=1&source=morda',
      nameRU: nameRU || 'Данные отсутствуют',
      nameEN: nameEN || 'Данные отсутствуют',
      movieId,
    });
  };
  const handleDelete = () => {
    deleteMovie(card.movieId);
  };

  const handleClickImg = () => {
    window.open(card.trailerLink);
  };

  useEffect(() => {
    return savedMoviesIds && savedMoviesIds.includes(card.movieId)
      ? setIsSelect(true)
      : setIsSelect(false);
  }, [savedMoviesIds, card.movieId]);


  return (
    <>
      <li className="movie">
        <div className="movie__container">
          <h2 className="movie__title">{card.nameRU}</h2>
          <p className="movie__time">{durationStr}</p>
          {moviesCardsListType === "general" ? (
            <button
              onClick={!isSelect ? handleSave : handleDelete}
              type="button"
              className={`movie__btn-select ${isSelect ? "movie__btn-select_active" : ""}`}/>
          ) : (
            <button
              type="button"
              onClick={handleDelete}
              className="movie__btn-delete"/>
          )}

        </div>

        <img onClick={handleClickImg} className="movie__image" src={`${MOVIES_IMAGE_URL}${card.image.url}`}
             alt={`Кадр из фильма ${card.nameRU}`}/>

      </li>

    </>

  );
}

export default MovieCard;
