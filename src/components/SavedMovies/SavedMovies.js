import React from "react";
import './SavedMovies.css';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import SearchForm from "../SearchForm/SearchForm";
import MovieCardList from "../MovieCardList/MovieCardList";

// import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";

function SavedMovies(props) {
  const {loggedIn, movies, searchMovies, deleteMovie, isLoading, findShortMovies} = props;


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
      <SearchForm searchMovie={searchMovies} setIsChecked={setIsChecked}/>
      <MovieCardList moviesCardsListType="saved"
                     movies={isChecked ? shortMovies : movies}
                     deleteMovie={deleteMovie}
                     isLoading={isLoading}/>
      <Footer/>
    </section>
  );
}

export default SavedMovies;
