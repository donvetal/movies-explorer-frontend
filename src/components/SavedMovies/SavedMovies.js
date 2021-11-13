import React from "react";
import './SavedMovies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <Header/>
      <SearchForm/>
      <SavedMoviesCardList moviesCardsListType="saved"/>
      <Footer/>
    </section>
  );
}

export default SavedMovies;
