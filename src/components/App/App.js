import './App.css';
import React, {useEffect} from "react";
import {Route, Switch} from "react-router-dom";
import Main from "../Main/Main";
import {CurrentUserContext} from "../../contexts/CurrentUserContext"
import Movies from "../Movies/Movies";
import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import PageNotFound from "../PageNotFound/PageNotFound";
import SavedMovies from "../SavedMovies/SavedMovies";
import moviesApi from "../../utils/MoviesApi";


//
function App() {
  const [currentUser, setCurrentUser] = React.useState({});

  useEffect(() => {
    moviesApi.getMoviesList()
      .then((data) => {
        setCurrentUser(data)
        console.log(data);
      })
      .catch(error => {
        console.log((error))
      })
  }, [])

  return (
    <div className="App">
      <CurrentUserContext.Provider value={currentUser}>
      <Switch>
        <Route path="/" exact>
          <Main/>
        </Route>
        <Route path="/movies">
          <Movies/>
        </Route>
        <Route path="/saved-movies">
          <SavedMovies/>
        </Route>
        <Route path="/signup">
          <Register/>
        </Route>
        <Route path="/signin">
          <Login/>
        </Route>
        <Route path="/profile">
          <Profile/>
        </Route>
        <Route path="*">
          <PageNotFound/>
        </Route>
      </Switch>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
