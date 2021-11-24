//MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
import React, {useEffect, useState} from 'react';
import './MovieCardList.css';
import MovieCard from "../MovieCard/MovieCard";
import Preloader from "../Preloader/Preloader";
import {renderCardsNumber} from "../../utils/constants";

function MovieCardList(props) {
  const {isLoading, saveMovie, deleteMovie, savedMoviesIds, moviesCardsListType,} = props;
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
      setDisplayedCardsNumber(renderCardsNumber.windowSizeXL);
      setDisplayedMoreCardsNumber(renderCardsNumber.windowSizeS);
    } else if (windowWidth >= 480) {
      setDisplayedCardsNumber(renderCardsNumber.windowSizeL);
      setDisplayedMoreCardsNumber(renderCardsNumber.windowSizeXS);
    } else {
      setDisplayedCardsNumber(renderCardsNumber.windowSizeM);
      setDisplayedMoreCardsNumber(renderCardsNumber.windowSizeXS);
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
      {!isLoading && movies.length === 0 && <p className="movies__text-void">Ничего не найдено</p>}
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
                    // isMovieCardSelect={movie.isMovieCardSelect}
                  />
                );

                return moviesToRender;
              }, [])}

            </ul>
            {!isLoading && movies.length > displayedCardsNumber && (
              <button type="button" className="movies__button" onClick={handleMoreClick}>Ещё</button>
            )}
          </>
        )
      }
    </>
  );

}

export default MovieCardList;


