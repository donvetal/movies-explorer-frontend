//Movies — компонент страницы с поиском по фильмам.
import React from 'react';
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
    isSearching,
    findShortMovies,
    searchMovies

  } = props;


  const [shortMovies, setShortMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (isChecked) {
      setShortMovies(findShortMovies(movies));
    }
  }, [isChecked, movies, findShortMovies]);


  return (
    <section className="movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm searchMovies={searchMovies} setIsChecked={setIsChecked}/>
      {isSearching ? (

        <MovieCardList moviesCardsListType="general"
                       movies={isChecked ? shortMovies : movies}
                       message={message}
                       saveMovie={saveMovie}
                       savedMoviesIds={savedMoviesIds}
                       isLoading={isLoading}/>

      ) : (
        <p className="movies__info">«Ничего не найдено»</p>
      )}

      <Footer/>
    </section>
  );
}

export default Movies;