//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import React from "react";
import './MovieCardList.css';
import MovieCard from "../MovieCard/MovieCard";
import {allMovies} from "../../utils/constants";


function MovieCardList() {


  return (

    <ul className="movies__list">
      {allMovies.map((movie) => <MovieCard
        moviesCardsListType="general"
        isMovieCardSelect={movie.isMovieCardSelect}
        image={movie.image}
        text={movie.text}
        time={movie.time}
      />)}

    </ul>
  );
}

export default MovieCardList;


