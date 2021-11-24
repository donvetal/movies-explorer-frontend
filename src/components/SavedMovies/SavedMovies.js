import React from "react";
import './SavedMovies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";
// import Movies from "../Movies/Movies";

// import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

function SavedMovies(props) {
  const {loggedIn, movies, searchMovies, deleteMovie, isLoading, findShortMovies, savedMoviesIds, isSearching} = props;


  const [shortMovies, setShortMovies] = React.useState([]);
  const [isChecked, setIsChecked] = React.useState(false);

  React.useEffect(() => {
    if (isChecked) {
      setShortMovies(findShortMovies(movies));
    }
  }, [isChecked, movies]);

  return (
    <section className="saved-movies">
      <Header loggedIn={loggedIn}/>
      <SearchForm searchMovies={searchMovies} setIsChecked={setIsChecked}/>

      {isSearching ? (
      <MovieCardList moviesCardsListType="saved"
                     movies={isChecked ? shortMovies : movies}
                     deleteMovie={deleteMovie}
                     savedMoviesIds={savedMoviesIds}
                     isLoading={isLoading}/>
      ) : (
        <p className="movies__info">«Ничего не найдено»</p>
      )}
      <Footer/>
    </section>
  );
}

export default SavedMovies;
