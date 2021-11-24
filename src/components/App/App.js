import './App.css';
import React, {useCallback, useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import moviesApi from "../../utils/MoviesApi";
import mainApi from "../../utils/MainApi";
import fail from '../../images/info-tooltip-fail.svg';
import successImg from '../../images/info-tooltip-success.svg';
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Movies from "../Movies/Movies";
import {MOVIES_IMAGE_URL} from "../../utils/constants";
import * as utils from '../../utils/utils';


function App(props) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [messageErr, setMessageErr] = React.useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]);
  const [savedMovieIds, setSavedMovieIds] = React.useState([]);

  const [searchValue, setSearchValue] = React.useState({});


  const successfulAuth = useCallback(() => {
    setLoggedIn(true);
    setIsLoading(true);

    mainApi.getProfile()
      .then(({data}) => {
        console.log(">>currentUser" + {data});
        if (!data) throw new Error(`Error: ${data.message}`);
        setCurrentUser(data);
        moviesApi.getMoviesList()
          .then((res) => {
            localStorage.setItem("movies", JSON.stringify(res || []));
            setMovies(res || []);
            setIsLoading(false);
            setLoggedIn(true);
          });
        mainApi.getProfileMovies()
          .then((res) => {
            console.log("profile movies >>> " + res.length);
            localStorage.setItem("savedMovies", JSON.stringify(res || []));
            setSavedMovies(res || []);

          });
      })
      .catch(error => {
        console.log(error);
      });

  }, []);


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
    mainApi.authorize(password, email)
      .then((res) => {
        if (!res || res.statusCode === 400 || res.statusCode === 401) throw new Error(`Ошибка: ${res.message}`);
        if (res.message === 'Авторизация прошла успешно!') {
          successfulAuth();
        } else {
          setIsInfoTooltipOpen(true);
        }
      })
      .catch(err => {
        setIsInfoTooltipOpen(true);
        console.log(err);
        setMessageErr(err);

      });
  };

  const handleRegister = ({password, email, name}) => {
    setIsAuthChecking(true);
    mainApi.register(password, email, name)
      .then((res) => {
        if (res.hasOwnProperty('error')) {
          setRegistered(false);
        } else {
          handleLogin({password, email});
          setIsAuthChecking(false);
          successfulAuth();
          setMessageErr("");
          setRegistered(true);

        }
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        console.log({err});
        setMessageErr(err);
        setIsInfoTooltipOpen(true);

      });
  };

  const handleUpdateProfile = ({name, email}) => {
    mainApi.updateProfile(name, email)
      .then((data) => {
        setCurrentUser(data);
      })
      .catch(error => {
        console.log(error);
        setMessageErr(error);
      });
  };

  const onInfoTooltipClose = () => {
    setIsInfoTooltipOpen(false);
  };

  // Выход из системы
  const handleSignOut = () => {
    mainApi.logout()
      .then((res) => {
        if (res) {
          setLoggedIn(false);
          props.history.push("/");
        }
      })
      .catch((err) => console.log(`Error: ${err}`));
  };


  function findShortMovies(movies) {
    const shortMoviesArray = movies.filter(
      (movie) => movie.duration <= 40
    );
    return shortMoviesArray;
  }


  const searchMovies = (keyword, isCheckbox) => {
    setIsLoading(true);
    setIsSearching(true);

    try {
      const filteredMovies = utils.searchByKeyword(movies, keyword, isCheckbox);
      setSearchedMovies(filteredMovies);
      setSearchValue({...searchValue, keyword: keyword});
      localStorage.setItem('searchedMovies', JSON.stringify(filteredMovies));
      localStorage.setItem('searchValue', JSON.stringify({isCheckbox, keyword}));
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
      movieId: movie.image.id
    })
      .then((savedMovie) => {
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([savedMovie, ...savedMovies])
        );

        setSavedMovies([savedMovie, ...savedMovies]);
        setSearchedSavedMovies([savedMovie, ...savedMovies]);
        setSavedMovieIds([...savedMovieIds, savedMovie.movieId]);
      })
      .catch((err) => {
        setMessageErr(err);
      });
  };


  // ---Функции поиска
  const searchSavedMovies = (keyword, isCheckbox) => {
    setIsLoading(true);

    try {
      const filteredMovies = utils.searchByKeyword(savedMovies, keyword, isCheckbox);
      setSearchedSavedMovies(filteredMovies);
    } catch (err) {
      setMessageErr(err);
    } finally {
      setIsLoading(false);
    }
  };


  const removeMovie = async ({movieId}) => {
    try {
      const removedMovie = await mainApi.deleteProfileMovie({movieId});

      if (removedMovie.message === 'Фильм удалён') {
        const filteredMovies = savedMovies.filter((movie) => movie.movieId !== movieId);
        const filteredMoviesIds = savedMovieIds.filter((id) => id !== movieId);

        setSavedMovies(filteredMovies);
        setSavedMovieIds(filteredMoviesIds);
        setSearchedSavedMovies(filteredMovies);
      }

      return;
    } catch (err) {
      setMessageErr(err.message);
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

  console.log("isAuthChecking:" + isAuthChecking);
  console.log("savedMovies: " + savedMovies);
  console.log('isInfoTooltipOpen:  ' + isInfoTooltipOpen);
  console.log('registered:  ' + registered);
  console.log(' loggedIn:  ' + loggedIn);

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
        <Switch>
          <Route path="/" exact>
            <Main loggedIn={loggedIn}/>
          </Route>
          <ProtectedRoute component={Movies}
                          path="/movies"
                          isChecking={isAuthChecking}
                          loggedIn={loggedIn}
                          movies={searchedMovies}
                          saveMovie={handleSaveMovie}
                          savedMoviesIds={savedMovieIds}
                          isLoading={isLoading}
                          isSearching={isSearching}
                          findShortMovies={findShortMovies}
                          deleteMovie={removeMovie}
                          message={messageErr}
                          searchMovies={searchMovies}/>


          <ProtectedRoute component={SavedMovies}
                          path="/saved-movies"
                          isChecking={isAuthChecking}
                          loggedIn={loggedIn}
                          isSearching={isSearching}
                          searchMovies={searchSavedMovies}
                          deleteMovie={removeMovie}
                          findShortMovies={findShortMovies}
                          isLoading={isLoading}
                          savedMoviesIds={savedMovieIds}
                          movies={searchedSavedMovies}/>


          <ProtectedRoute component={Profile}
                          path="/profile"
                          isChecking={isAuthChecking}
                          loggedIn={loggedIn}
                          onSignOut={handleSignOut}
                          message={messageErr}
                          onUpdateProfile={handleUpdateProfile}/>


          <Route path="/signup">

            {loggedIn ? (<Redirect to="movies"/>) : (<Register onRegister={handleRegister} message={messageErr}/>)}

          </Route>
          <Route path="/signin">
            {loggedIn ? (<Redirect to="movies"/>) : (<Login onLogin={handleLogin} message={messageErr}/>)}


          </Route>

          <Route path="*">
            <PageNotFound/>
          </Route>
        </Switch>
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={onInfoTooltipClose}
          image={registered ? successImg : fail}
          title={registered ? 'Вы вошли!' : 'Что-то пошло не так! Попробуйте ещё раз.'}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
