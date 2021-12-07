import React, {useEffect, useState} from "react";
import './SavedMovies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";


function SavedMovies(props) {
  const {
    loggedIn,
    searchMovies,
    movies,
    deleteMovie,
    isLoading,
    findShortMovies,
    message,
    initSavedMovies,
    savedMovies,
    savedMoviesIds,
    resetMessage
  } = props;

  const [shortMovies, setShortMovies] = useState([]);
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    if (isChecked) {
      setShortMovies(findShortMovies(movies));
    }
  }, [isChecked, movies, findShortMovies]);

  useEffect(() => {
    initSavedMovies();
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies]);


  return (
    <section className="saved-movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm searchMovies={searchMovies} setIsChecked={setIsChecked} resetMessage={resetMessage}/>

      <MovieCardList moviesCardsListType="saved"
                     movies={isChecked ? shortMovies : movies}
                     deleteMovie={deleteMovie}
                     message={message}
                     savedMovies={savedMovies}
                     savedMoviesIds={savedMoviesIds}
                     isLoading={isLoading}/>

      <Footer/>
    </section>
  );
}

export default SavedMovies;
