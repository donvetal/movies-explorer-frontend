//Movies — компонент страницы с поиском по фильмам.
import React, {useEffect, useState} from 'react';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import './Movies.css';
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";

function Movies(props) {
  const {
    saveMovie,
    savedMoviesIds,
    loggedIn,
    movies,
    isLoading,
    message,
    findShortMovies,
    searchMovies,
    resetMessage,
    savedMovies,
    deleteMovie

  } = props;


  const [shortMovies, setShortMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setShortMovies(findShortMovies(movies));
    }
  }, [isChecked, movies, findShortMovies]);

  useEffect(() => {
    resetMessage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <section className="movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm searchMovies={searchMovies} setIsChecked={setIsChecked} resetMessage={resetMessage}/>
      <MovieCardList moviesCardsListType="general"
                     movies={isChecked ? shortMovies : movies}
                     message={message}
                     saveMovie={saveMovie}
                     savedMovies={savedMovies}
                     deleteMovie={deleteMovie}
                     savedMoviesIds={savedMoviesIds}
                     resetMessage={resetMessage}
                     isLoading={isLoading}/>

      <Footer/>
    </section>
  );
}

export default Movies;