//Movies — компонент страницы с поиском по фильмам.
import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";

function Movies() {
  return (
    <section className="movies">
      <Header/>
      <h1 className="movies__title">MOVIES</h1>
      <SearchForm/>
      <Footer/>
    </section>
  );
}

export default Movies;