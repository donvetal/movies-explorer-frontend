import './App.css';
import React, {useCallback, useEffect} from "react";
import {Redirect, Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import Movies from "../Movies/Movies";
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


function App(props) {
  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [messageErr, setMessageErr] = React.useState(null);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false);
  const [registered, setRegistered] = React.useState(false);
  const [movies, setMovies] = React.useState([]);
  const [foundMovies, setFoundMovies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [isAuthChecking, setIsAuthChecking] = React.useState(true);

  const [savedMovies, setSavedMovies] = React.useState([]);
  const [searchedSavedMovies, setSearchedSavedMovies] = React.useState([]);
  const [savedMovieIds, setSavedMovieIds] = React.useState([]);

  useEffect(() => {

    moviesApi.getMoviesList()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res || []));
        setMovies(res || []);
        setIsLoading(false);
        console.log(res);
      })
      .catch(error => {
        console.log((error));
      });
  }, []);

  const successfulAuth = useCallback(() => {
    setLoggedIn(true);
    setIsLoading(true);

    mainApi.getProfile()
      .then(({data}) => {
        console.log(">>currentUser" + {data})
        if (!data) throw new Error(`Error: ${data.message}`);
        setCurrentUser(data);
        // mainApi.getProfileMovies()
        //   .then(({data}) => {
        //     if (!data) throw new Error(`Error: ${data.message}`);
        //     if ((data)) {
        //       setCards(data);
        //       setLoggedIn(true);
        //       props.history.push('/');
        //     }
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
        }
      })
      .catch(() => {
        setIsAuthChecking(false);
        // props.history.push('/');
      });
    // .finally(() => {
    //   setIsAuthChecking(false);
    // });

  }, [successfulAuth]);


  const handleLogin = ({password, email}) => {
    mainApi.authorize(password, email)
      .then((res) => {
        if (!res || res.statusCode === 400 || res.statusCode === 401) throw new Error(`Ошибка: ${res.message}`);
        if (res.message === 'Авторизация прошла успешно!') {
          // setEmail({email: email});
          setLoggedIn(true);
          // successfulAuth();
        } else {
          setIsInfoTooltipOpen(true);
          setLoggedIn(false);

        }
      })
      .catch(err => {
        setIsInfoTooltipOpen(true);
        console.log(err);
        setMessageErr(err);

      });
  };

  const handleRegister = ({password, email, name}) => {
    mainApi.register(password, email, name)
      .then((res) => {
        if (res.hasOwnProperty('error')) {
          console.log("NOT REGISTRETED");
          setRegistered(false);
        } else {
          setLoggedIn(true);
          console.log("REGISTRETED");
          setMessageErr("");
          setRegistered(true);

        }
        setIsInfoTooltipOpen(true);
      })
      .catch((err) => {
        // if(error.statusCode === 409){
        //   setMessageErr( "Пользователь с таким email уже существует");
        // }
        console.log({err});
        setMessageErr(err);
        setIsInfoTooltipOpen(true);

      });
  };

  const handleUpdateProfile = ({name, email}) => {
    console.log('name in App' + name);
    console.log('name in App' + email);
    mainApi.updateProfile(name, email)
      .then((data) => {
        setCurrentUser(data);
        console.log("!!!!!!!!APP data updateProfile" + data);
      })
      .catch(error => {
        console.log(error);
        setMessageErr(error);
      });
  };

  const onInfoTooltipClose = () => {
    setIsInfoTooltipOpen(false);
    // if (registered) {
    //   setTimeout(() => props.history.push("/signin"), 1000);
    // }

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

  // функция поиска фильма
  function handleMoviesSearch(query) {
    setIsLoading(true);
    setIsSearching(true);
    const searchTerm = query.toLowerCase();
    const movieSearchResult = movies.filter((item) => {
      return item.nameRU.toLowerCase().includes(searchTerm);
    });
    if (movieSearchResult.length === 0) {
      setMessageErr("Фильмы не найдены");
      setFoundMovies([]);
      // setIsMoviesLoading(false);
      setIsSearching(false);
    } else {
      setFoundMovies(movieSearchResult);
      setMessageErr("");
      setIsLoading(false);

    }
  }


  const handleSaveMovie = (
    {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      movieId,
      nameRU,
      nameEN
    }) => {
    console.log("movieData:" + country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      movieId,
      nameRU,
      nameEN);
    mainApi.setProfileMovie(country,
      director,
      duration,
      year,
      description,
      image,
      trailer,
      thumbnail,
      movieId,
      nameRU,
      nameEN)
      .then((savedMovie) => {

        localStorage.setItem(
          "savedMovies",
          JSON.stringify([savedMovie, ...savedMovies])
        );
        console.log("savedMovies: " + savedMovies);
        setSavedMovies([savedMovie, ...savedMovies]);
        setSearchedSavedMovies([savedMovie, ...savedMovies]);
        setSavedMovieIds([...savedMovieIds, savedMovie.movieId]);
      })
      .catch((err) => {
        setMessageErr(err);
      });
  };

  //функция поиска в сохраненных фильмах
  function handleSavedMovieSearch(query) {
    setIsSearching(true);
    const searchTerm = query.toLowerCase();
    if (searchTerm === "") {
      setSearchedSavedMovies([]);
      return;
    }
    const savedMovieSearchResult = savedMovies.filter((item) => {
      return item.nameRU.toLowerCase().includes(searchTerm);
    });
    if (savedMovieSearchResult.length === 0) {
      setMessageErr("Фильмы не найдены");
      setSearchedSavedMovies([]);
    } else {
      setSearchedSavedMovies(savedMovieSearchResult);
    }
  }


  const handleDeleteMovie = ({movieId}) => {
    mainApi.deleteProfileMovie(movieId)
      .then(() => {
        localStorage.setItem(
          "savedMovies",
          JSON.stringify(savedMovies.filter((movie) => movie.movieId !== movieId))
        );

        setSavedMovies(savedMovies.filter((movie) => movie.movieId !== movieId));
        setSearchedSavedMovies(savedMovies.filter((movie) => movie.movieId !== movieId));
        setSavedMovieIds(savedMovieIds.filter((id) => id !== movieId));
      })
      .catch((err) => {
        console.log(err);
      });
  };


  // console.log('isAuthChecking:  ' + isAuthChecking);
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
          <Route path="/movies">
            <Movies loggedIn={loggedIn}
                    movies={foundMovies}
                    saveMovie={handleSaveMovie}
                    savedMoviesIds={savedMovieIds}
                    isLoading={isLoading}
                    isSearching={isSearching}
                    findShortMovies={findShortMovies}
                    deleteMovie={handleDeleteMovie}
                    message={messageErr}
                    searchMovies={handleMoviesSearch}/>
          </Route>
          <Route path="/saved-movies">
            <SavedMovies loggedIn={loggedIn}
                         isSearching={isSearching}
                         searchMovies={handleSavedMovieSearch}
                         deleteMovie={handleDeleteMovie}
                         findShortMovies={findShortMovies}
                         isLoading={isLoading}
                         savedMoviesIds={savedMovieIds}
                         movies={searchedSavedMovies}/>
          </Route>
          <Route path="/signup">

            {loggedIn ? (<Redirect to="movies"/>) : (<Register onRegister={handleRegister} message={messageErr}/>)}

          </Route>
          <Route path="/signin">
            {loggedIn ? (<Redirect to="movies"/>) : (<Login onLogin={handleLogin} message={messageErr}/>)}


          </Route>
          <Route path="/profile">
            <Profile loggedIn={loggedIn}
                     onSignOut={handleSignOut}
                     message={messageErr}
                     onUpdateProfile={handleUpdateProfile}/>

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
