import React from "react";
import './SavedMovies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";


function SavedMovies(props) {
  const {loggedIn, movies, searchMovies, deleteMovie, isLoading, savedMoviesIds} = props;


  return (
    <section className="saved-movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm searchMovies={searchMovies}/>

      <MovieCardList moviesCardsListType="saved"
                     movies={movies}
                     deleteMovie={deleteMovie}
                     savedMoviesIds={savedMoviesIds}
                     isLoading={isLoading}/>

      <Footer/>
    </section>
  );
}

export default SavedMovies;
