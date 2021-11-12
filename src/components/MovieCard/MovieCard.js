//MoviesCard — компонент одной карточки фильма.
// import React, { useState} from "react";
import React from "react";
import './MovieCard.css';
import movieImage from "../../images/movie-picture.jpeg";

function MovieCard() {
  // const {moviesCardsListType, isMovieCardSelect} = props;
  // const [isSelectMovieCard, setIsSelectMovieCard] = useState(isMovieCardSelect)
  // const handleSelectClick = () => {
  //   setIsSelectMovieCard(!isSelectMovieCard);

// };
  return (
    <>
    <li className="movie-card">
      <div className="movie-card__container">
        <h2 className="movie-card__title">33 слова о дизайне</h2>
        <p className="movie-card__time">1ч 47м</p>
        <button type="button" className="movie-card__btn-select"></button>
      </div>
      <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

    </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select movie-card__btn-select_active"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select movie-card__btn-select_active"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select movie-card__btn-select_active"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
      <li className="movie-card">
        <div className="movie-card__container">
          <h2 className="movie-card__title">33 слова о дизайне</h2>
          <p className="movie-card__time">1ч 47м</p>
          <button type="button" className="movie-card__btn-select"></button>
        </div>
        <img className="movie-card__image" src={movieImage} alt="изображение из фильма"/>

      </li>
    </>

  );
}

export default MovieCard;