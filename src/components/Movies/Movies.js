//Movies — компонент страницы с поиском по фильмам.
import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
// import Preloader from "../Preloader/Preloader";
import MovieCardList from "../MovieCardList/MovieCardList";

function Movies(props) {
  const {loggedIn, searchMovie, movies, isLoading, message, isSearching} =props;
  // const isLoading = false;
  return (
    <section className="movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm searchMovie={searchMovie}/>
      {isSearching ? (
          <>
            <MovieCardList moviesCardsListType="general"
                           movies={movies}
                           message={message}
                           isLoading={isLoading}/>
            {/*<button type="button" className="movies__button">Ещё</button>*/}
          </>
      ) : (
        <p className="movies__info">«Ничего не найдено»</p>
      )}

      <Footer/>
    </section>
  );
}

export default Movies;