//Movies — компонент страницы с поиском по фильмам.
import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import MovieCardList from "../MovieCardList/MovieCardList";

function Movies() {
  const isLoading = false;
  return (
    <section className="movies">
      <Header/>
      <SearchForm/>
      {
        isLoading ? (<Preloader/>) : (
          <>
            <MovieCardList/>
            <button type="button" className="movies__button">Ещё</button>
          </>
        )}
      <Footer/>
    </section>
  );
}

export default Movies;