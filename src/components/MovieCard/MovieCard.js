//MoviesCard — компонент одной карточки фильма.
import React, {useEffect, useState} from "react";
import './MovieCard.css';
import {IMAGE_URL, MOVIES_IMAGE_URL, TEXT, THUMBNAIL_URL, YOUTUBE_URL} from "../../utils/constants";


function MovieCard(props) {

  const {moviesCardsListType, saveMovie, card, deleteMovie, savedMoviesIds, savedMovies} = props;

  const {
    country,
    director,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    nameRU,
    nameEN,
    duration,
    movieId,
  } = card;
  const [isSelect, setIsSelect] = useState(false);


  const hours = Math.floor(card.duration / 60);
  const minutes = card.duration - hours * 60;
  const durationStr = hours ? `${hours}ч ${minutes}м` : `${minutes}мин`;

  console.log("save card step 0" + JSON.stringify(card));

  const handleSave = () => {
    saveMovie({
        country: country || TEXT.noData,
        director: director || TEXT.noData,
        duration: duration || 0,
        year: year || TEXT.noData,
        description: description || '',
        image: image || IMAGE_URL,
        trailer: trailerLink || YOUTUBE_URL,
        thumbnail: thumbnail || THUMBNAIL_URL,
        nameRU: nameRU || TEXT.noData,
        nameEN: nameEN || TEXT.noData,
        movieId,
      }
    );
  };

  console.log("save movie " + JSON.stringify(saveMovie));
  const handleDelete = () => {
    const savedMovie = savedMovies.find((movie) => (movie.movieId === card.id || movie.movieId === card.movieId || movie.movieId === card.image.id));
    deleteMovie(savedMovie);
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
        <a
          href={moviesCardsListType === "general" ? (card.trailerLink) : (card.trailer)}
          target="_blank"
          rel="noreferrer"
          className="movie__link"
        >
          <img
            className="movie__image"
            src={moviesCardsListType === "general" ? (`${MOVIES_IMAGE_URL}${card.image.url}`) : (card.image)}
            alt={`Кадр из фильма ${card.nameRU}`}/>
        </a>

      </li>

    </>

  );
}

export default MovieCard;
