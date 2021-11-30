//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import React, {useEffect, useState} from 'react';
import './MovieCardList.css';
import MovieCard from "../MovieCard/MovieCard";
import Preloader from "../Preloader/Preloader";
import {RENDER_CARDS_NUMBER, TEXT} from "../../utils/constants";

function MovieCardList(props) {
  const {isLoading, saveMovie, deleteMovie, savedMoviesIds, moviesCardsListType, message, savedMovies} = props;
  const movies = props.movies || [];


  const [displayedCardsNumber, setDisplayedCardsNumber] = useState(0);
  const [displayedMoreCardsNumber, setDisplayedMoreCardsNumber] = useState(0);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleMoreClick = () => {
    setDisplayedCardsNumber(displayedCardsNumber + displayedMoreCardsNumber);
  };

  const updateWindowWidth = () => {
    setTimeout(() => setWindowWidth(window.innerWidth), 1000);
  };

  const renderCards = React.useCallback(() => {
    if (windowWidth >= 890) {
      setDisplayedCardsNumber(RENDER_CARDS_NUMBER.windowSizeXL);
      setDisplayedMoreCardsNumber(RENDER_CARDS_NUMBER.windowSizeS);
    } else if (windowWidth >= 480) {
      setDisplayedCardsNumber(RENDER_CARDS_NUMBER.windowSizeL);
      setDisplayedMoreCardsNumber(RENDER_CARDS_NUMBER.windowSizeXS);
    } else {
      setDisplayedCardsNumber(RENDER_CARDS_NUMBER.windowSizeM);
      setDisplayedMoreCardsNumber(RENDER_CARDS_NUMBER.windowSizeXS);
    }

    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [windowWidth]);

  useEffect(() => {
    renderCards();
  }, [renderCards]);

  useEffect(() => {
    window.addEventListener('resize', updateWindowWidth);
    return () => window.removeEventListener('resize', updateWindowWidth);
  }, [windowWidth]);


  return (
    <>
      {!isLoading && message && <p className="movies__text-void">{message}</p>}
      {
        isLoading ? (
          <Preloader/>
        ) : (
          <>
            <ul className="movies__list">

              {movies.reduce((moviesToRender, movie) => {
                moviesToRender.length < displayedCardsNumber &&
                moviesToRender.push(
                  <MovieCard
                    saveMovie={saveMovie}
                    savedMoviesIds={savedMoviesIds}
                    key={movie.id}
                    card={movie}
                    deleteMovie={deleteMovie}
                    moviesCardsListType={moviesCardsListType}
                    savedMovies={savedMovies}
                  />
                );

                return moviesToRender;
              }, [])}

            </ul>
            {!isLoading && movies.length > displayedCardsNumber && (
              <button type="button" className="movies__button" onClick={handleMoreClick}>{TEXT.buttonMore}</button>
            )}
          </>
        )
      }
    </>
  );

}

export default MovieCardList;


