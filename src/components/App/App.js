import './App.css';
import React, {useCallback, useEffect, useState} from "react";
import {Redirect, Route, Switch, useHistory} from "react-router-dom";
import Main from "../Main/Main";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Movies from "../Movies/Movies";
import {MAX_SHORT_MOVIE_LENGTH, MESSAGES, MOVIES_IMAGE_URL} from "../../utils/constants";
import * as utils from '../../utils/utils';


function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);


  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormSending, setIsFormSending] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isAuthChecking, setIsAuthChecking] = useState(true);
  const [savedMovies, setSavedMovies] = useState([]);
  const [savedMovieIds, setSavedMovieIds] = useState([]);
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = useState([]);
  const [searchValue, setSearchValue] = useState({});
  // InfoTooltip
  const [resultSuccessful, setResultSuccessful] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [messageErr, setMessageErr] = useState(null);
  const [infoMessage, setInfoMessage] = useState('');

  const history = useHistory();


  const onInfoTooltipClose = () => {
    setIsInfoTooltipOpen(false);
  };

  function handleError(error) {
    setMessageErr(error);
    handleInfo(false, MESSAGES.defaultError);
  }

  function handleInfo(success, message) {
    setResultSuccessful(success);
    setInfoMessage(message);
    setIsInfoTooltipOpen(true);
  }


  const successfulAuth = useCallback(() => {
    setLoggedIn(true);
    setIsLoading(true);

    mainApi.getProfile()
      .then(({data}) => {
        if (!data) handleInfo(false, MESSAGES.fetchErrorMessage);
        setCurrentUser(data);
        setIsFormSending(false);
        moviesApi.getMoviesList()
          .then((res) => {
            if (!res) handleInfo(false, MESSAGES.fetchErrorMessage);
            setMovies(res || []);
            setLoggedIn(true);

          });
        mainApi.getProfileMovies()
          .then(({movies}) => {
            if (!movies) handleInfo(false, MESSAGES.fetchErrorMessage);
            setMessageErr("");
            setSavedMovies(movies);
            setSearchedSavedMovies(movies);
            const saveIds = movies.map((movie) => movie.movieId);
            setSavedMovieIds(saveIds);
          });
      })
      .catch(error => {
        setIsLoading(false);
        console.log(error);
        setMessageErr(error);
      })
      .finally(() => {

        setIsLoading(false);

      });

  }, []);

  const resetMessage = () => {
    setMessageErr("");
  };


  // Проверка авторизации пользователя
  useEffect(() => {
    setIsAuthChecking(true);

    mainApi.checkAuth()
      .then(res => {
        if (res) {
          successfulAuth();
          setIsAuthChecking(false);
        }
      })
      .catch(() => {
        setIsAuthChecking(false);
      })
      .finally(() => {
        setIsAuthChecking(false);
      });

  }, [successfulAuth]);


  const handleLogin = ({password, email}) => {
    setIsFormSending(true);
    mainApi.authorize(password, email)
      .then((res) => {
        if (!res || res.statusCode === 400 || res.statusCode === 401) throw new Error(`Ошибка: ${res.message}`);
        if (res.message === MESSAGES.authorizationSuccessful) {
          handleInfo(true, MESSAGES.auth);
          successfulAuth();
          setMessageErr("");
        }
      })
      .catch(err => {
        handleError(err);
        setIsFormSending(false);
      })
      .finally(() => {
        setIsFormSending(false);
        setIsLoading(false);
      });
  };

  const handleRegister = ({password, email, name}) => {
    setIsAuthChecking(true);
    setIsFormSending(true);
    mainApi.register(password, email, name)
      .then(() => {
        handleInfo(true, MESSAGES.register);
        handleLogin({password, email});
        setIsAuthChecking(false);
        successfulAuth();
        setMessageErr("");
      })
      .catch((err) => {
        handleError(err);
      })
      .finally((() => {
          setIsLoading(false);
          setIsFormSending(false);
        }
      ));
  };

  const handleUpdateProfile = ({name, email}) => {
    setIsFormSending(true);
    mainApi.updateProfile(name, email)
      .then(({data}) => {
        setCurrentUser(data);
        handleInfo(true, MESSAGES.userUpdate);
        setMessageErr("");
      })
      .catch(err => {
        setMessageErr(err);
        handleError(err);
      })
      .finally(() => {
        setIsFormSending(false);
      });
  };


  // Выход из системы
  const handleSignOut = () => {
    mainApi.logout()
      .then((res) => {
        if (res) {
          handleInfo(true, MESSAGES.logout);
          setLoggedIn(false);
          setIsFormSending(false);
          setSearchedMovies([]);
          setSearchValue({});
          setIsSearching(false);
          localStorage.removeItem('searchedMovies');
          localStorage.removeItem('searchValue');
          history.push("/");

        }
      })
      .catch((err) => console.log(err));
  };


  function findShortMovies(movies) {
    const shortMoviesArray = movies.filter(
      (movie) => movie.duration <= MAX_SHORT_MOVIE_LENGTH
    );
    if (shortMoviesArray.length === 0) {
      setMessageErr(MESSAGES.moviesNotFound);
    } else {
      setMessageErr("");
    }
    return shortMoviesArray;


  }


  const searchMovies = (keyword, isCheckbox) => {
    setIsLoading(true);
    setIsSearching(true);

    try {
      const filteredMovies = utils.searchByKeyword(movies, keyword, isCheckbox);
      if (filteredMovies.length === 0) {
        setMessageErr(MESSAGES.moviesNotFound);
        setSearchedMovies([]);
      } else {
        setMessageErr("");
        setSearchedMovies(filteredMovies);
        setSearchValue({...searchValue, keyword: keyword});
        localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
        localStorage.setItem('searchValue', JSON.stringify({isCheckbox, keyword}));
      }
    } catch (err) {
      setMessageErr(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveMovie = (movie) => {
    mainApi.setProfileMovie({
      ...movie,
      image: `${MOVIES_IMAGE_URL}${movie.image.url}`,
      thumbnail: `${MOVIES_IMAGE_URL}${movie.image.formats.thumbnail.url}`,
      movieId: movie.image.id,
      trailer: movie.trailer,
    })
      .then(({data}) => {
        setSavedMovies([data, ...savedMovies]);
        setSavedMovieIds([...savedMovieIds, data.movieId]);
        setSearchedSavedMovies([data, ...savedMovies]);
      })
      .catch((err) => {
        setMessageErr(err);
      });
  };

  const removeMovie = (savedMovie) => {
    console.log("App delete movie" + JSON.stringify(savedMovie));
    mainApi.deleteProfileMovie(savedMovie._id)
      .then(() => {
        const filteredMovies = savedMovies.filter((movie) => movie._id !== savedMovie._id);
        const filteredMoviesIds = savedMovieIds.filter((id) => id !== savedMovie.movieId);
        setSavedMovies(filteredMovies);
        setSavedMovieIds(filteredMoviesIds);
        setSearchedSavedMovies(filteredMovies);
      })
      .catch((err) => {
        setMessageErr(err);
      });

  };


  // Saved Movies
  function handleInitSavedMovies() {
    setSearchedSavedMovies(savedMovies);
    setMessageErr("");

  }

  // ---Функции поиска
  const searchSavedMovies = (keyword, isCheckbox) => {
    setIsLoading(true);

    try {
      const filteredMovies = utils.searchByKeyword(savedMovies, keyword, isCheckbox);
      if (filteredMovies.length === 0) {
        setMessageErr(MESSAGES.moviesNotFound);
        setSearchedSavedMovies([]);
      } else {
        setMessageErr("");
        setSearchedSavedMovies(filteredMovies);
      }
    } catch (err) {
      setMessageErr(err);
    } finally {
      setIsLoading(false);
    }
  };


  // Проверка наличия данных в localStorage
  useEffect(() => {
    const localSearchMovies = localStorage.getItem('searchedMovies');
    const localSearchValue = localStorage.getItem('searchValue');

    if (loggedIn && localSearchValue && localSearchMovies) {
      setSearchedMovies(JSON.parse(localSearchMovies));
      setSearchValue(JSON.parse(localSearchValue));
      setIsSearching(true);
    }
    return;
  }, [loggedIn]);


  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/" exact>
            <Main loggedIn={loggedIn}/>
          </Route>
          <ProtectedRoute component={Movies}
                          movies={searchedMovies}
                          savedMovies={savedMovies}
                          path="/movies"
                          loggedIn={loggedIn}
                          isLoading={isLoading}
                          isChecking={isAuthChecking}
                          searchValue={searchValue}
                          saveMovie={handleSaveMovie}
                          savedMoviesIds={savedMovieIds}
                          deleteMovie={removeMovie}
                          searchMovies={searchMovies}
                          isSearching={isSearching}
                          findShortMovies={findShortMovies}
                          resetMessage={resetMessage}
                          message={messageErr}
          />


          <ProtectedRoute component={SavedMovies}
                          path="/saved-movies"
                          movies={searchedSavedMovies}
                          initSavedMovies={handleInitSavedMovies}
                          searchMovies={searchSavedMovies}
                          deleteMovie={removeMovie}
                          isChecking={isAuthChecking}
                          loggedIn={loggedIn}
                          isSearching={isSearching}
                          findShortMovies={findShortMovies}
                          resetMessage={resetMessage}
                          isLoading={isLoading}
                          message={messageErr}
                          savedMovies={savedMovies}
                          savedMoviesIds={savedMovieIds}
          />


          <ProtectedRoute component={Profile}
                          path="/profile"
                          isChecking={isAuthChecking}
                          loggedIn={loggedIn}
                          onSignOut={handleSignOut}
                          message={messageErr}
                          resetMessage={resetMessage}
                          isSending={isFormSending}
                          onUpdateProfile={handleUpdateProfile}
          />


          <Route path="/signup">

            {loggedIn ? (<Redirect to="movies"/>) : (<Register onRegister={handleRegister}
                                                               message={messageErr}
                                                               isSending={isFormSending}/>)}

          </Route>
          <Route path="/signin">
            {loggedIn ? (<Redirect to="movies"/>) : (<Login onLogin={handleLogin}
                                                            message={messageErr}
                                                            isSending={isFormSending}/>)}


          </Route>

          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={onInfoTooltipClose}
          result={resultSuccessful}
          message={infoMessage}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
