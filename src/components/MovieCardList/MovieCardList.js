//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import React from "react";
import './MovieCardList.css';
import MovieCard from "../MovieCard/MovieCard";
// import {allMovies} from "../../utils/constants";


function MovieCardList(props) {
  const movies = props.movies || [];


  return (

    <ul className="movies__list">
      {movies && movies.map((movie) => <MovieCard
        card={movie}
        key={movie.id}
        moviesCardsListType="general"
        isMovieCardSelect={movie.isMovieCardSelect}
        // image={movie.image}
        // text={movie.text}
        // time={movie.time}
      />)}

    </ul>
  );
}

export default MovieCardList;


