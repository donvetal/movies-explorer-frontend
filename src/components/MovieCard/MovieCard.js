//MoviesCard — компонент одной карточки фильма.
import React, {useEffect, useState} from "react";
import './MovieCard.css';
import {MOVIES_IMAGE_URL} from "../../utils/constants";


function MovieCard(props) {

  const {moviesCardsListType, saveMovie, card, deleteMovie, savedMoviesIds, savedMovies} = props;

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
    const savedMovie = savedMovies.find((movie) => (movie.movieId === card.id || movie.movieId === card.movieId));
    deleteMovie(savedMovie);
  };

  const handleClickImg = () => {
    window.open(card.trailerLink);
  };

  useEffect(() => {
    return savedMoviesIds && savedMoviesIds.includes(card.image.id)
      ? setIsSelect(true)
      : setIsSelect(false);
  }, [savedMoviesIds, card, card.image.id]);


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

        <img onClick={handleClickImg}
             className="movie__image"
             src={moviesCardsListType === "general" ? (`${MOVIES_IMAGE_URL}${card.image.url}`) : (card.image)}
             alt={`Кадр из фильма ${card.nameRU}`}/>

      </li>

    </>

  );
}

export default MovieCard;
