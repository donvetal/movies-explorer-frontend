import './App.css';
import React, {useEffect, useCallback} from "react";
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
  const [isMoviesLoading, setIsMoviesLoading] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  // const [isAuthChecking, setIsAuthChecking] = React.useState(true);


  const successfulAuth = useCallback(() => {
    setLoggedIn(true);
    mainApi.getProfile()
      .then(({data}) => {
        if (!data) throw new Error(`Error: ${data.message}`);
        setCurrentUser(data)
        // setEmail({email: data.email})
        // api.getCardList()
        //   .then(({data}) => {
        //     if (!data) throw new Error(`Error: ${data.message}`);
        //     if (Array.isArray(data)) {
        //       setCards(data);
        //       setLoggedIn(true);
        //       props.history.push('/');
        //     // }
          })
          .catch(error => {
            console.log(error);
          });

  });

  useEffect(() => {

    moviesApi.getMoviesList()
      .then((res) => {
        localStorage.setItem("movies", JSON.stringify(res || []));
        setMovies(res || []);
        setIsMoviesLoading(false);
        console.log(res);
      })
      .catch(error => {
        console.log((error));
      });
  }, []);

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



  // Проверка авторизации пользователя
  // useEffect(() => {
  //   setIsAuthChecking(true);
  //
  //   mainApi.checkAuth()
  //     .then(res => {
  //       if (res) {
  //         successfulAuth();
  //       }
  //     })
  //     .catch(() => {
  //       setIsAuthChecking(false);
  //       // props.history.push('/');
  //     });
  //   // .finally(() => {
  //   //   setIsAuthChecking(false);
  //   // });
  //
  // }, [props.history]);

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






  const handleUpdateProfile = ({name, email}) => {
    console.log('name' + name)
    mainApi.updateProfile(name, email)
      .then(({data}) => {
        setCurrentUser(data);
        console.log(">>>" + data)
    })
      .catch(error => {
        console.log(error);
        setMessageErr(error);
      })
  }

  // функция поиска фильма
  function handleMovieSearch(query) {
    setIsMoviesLoading(true);
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
      setIsMoviesLoading(false);

    }
  }


  // console.log('isAuthChecking:  ' + isAuthChecking);
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
                    isLoading={isMoviesLoading}
                    isSearching={isSearching}
                    message={messageErr}
                    searchMovie={handleMovieSearch}/>
          </Route>
          <Route path="/saved-movies">
            <SavedMovies loggedIn={loggedIn}/>
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
