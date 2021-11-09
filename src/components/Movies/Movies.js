//Movies — компонент страницы с поиском по фильмам.
import React from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Movies.css'

function Movies() {
  return (
    <section className="movies">
      <Header/>
      <Footer/>
    </section>
  );
}

export default Movies;