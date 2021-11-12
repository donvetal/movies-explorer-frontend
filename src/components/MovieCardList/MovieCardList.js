//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import React from "react";
import './MovieCardList.css';
import MovieCard from "../MovieCard/MovieCard";

function MovieCardList() {
  return (
    <ul className="movie-cards">
      <MovieCard/>
    </ul>
  );
}

export default MovieCardList;