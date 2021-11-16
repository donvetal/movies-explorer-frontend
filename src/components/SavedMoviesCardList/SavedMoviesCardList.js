//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import React from "react";
import './SavedMoviesCardList.css';
import MovieCard from "../MovieCard/MovieCard";
import {savedMovies} from "../../utils/constants";


function SavedMoviesCardList() {


  return (
    <ul className="saved-movies__list">
      {savedMovies.map((movie) => <MovieCard
        moviesCardsListType="saved"
        image={movie.image}
        text={movie.text}
        time={movie.time}
      />)}
    </ul>
  );
}

export default SavedMoviesCardList;

