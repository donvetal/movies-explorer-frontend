import React from "react";
import './SavedMovies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies() {
  return (
    <section className="saved-movies">
      <Header/>
      <h1 className="saved-movies__title">SAVED MOVIES</h1>
      <SearchForm/>
      <Footer/>
    </section>
  );
}

export default SavedMovies;
