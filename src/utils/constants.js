import movieImage1 from "../images/movie-picture1.jpeg";
import movieImage2 from "../images/movie-picture2.jpeg";
import movieImage3 from "../images/movie-picture3.jpeg";
import movieImage4 from "../images/movie-picture4.jpeg";
import movieImage5 from "../images/movie-picture5.jpeg";
import movieImage6 from "../images/movie-picture6.jpeg";
import movieImage7 from "../images/movie-picture7.jpeg";
import movieImage8 from "../images/movie-picture8.jpeg";
import movieImage9 from "../images/movie-picture9.jpeg";
import movieImage10 from "../images/movie-picture10.jpeg";
import movieImage11 from "../images/movie-picture11.jpeg";
import movieImage12 from "../images/movie-picture12.jpeg";

export const allMovies = [{image: movieImage1, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage2, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage3, isMovieCardSelect: true, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage4, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage5, isMovieCardSelect: true, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage6, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage7, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage8, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage9, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage10, isMovieCardSelect: true, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage11, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage12, isMovieCardSelect: false, text: "33 слова о дизайне", time: "1ч 47м"},];

export const savedMovies = [{image: movieImage1, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage2, text: "33 слова о дизайне", time: "1ч 47м"},
  {image: movieImage3, text: "33 слова о дизайне", time: "1ч 47м"}];

export const MOVIES_IMAGE_URL = 'https://api.nomoreparties.co';

export const RENDER_CARDS_NUMBER = {
  windowSizeXS: 2,
  windowSizeS: 3,
  windowSizeM: 5,
  windowSizeL: 8,
  windowSizeXL: 12,
};
export const MAX_SHORT_MOVIE_LENGTH = '40';

export const TEXT = {
  buttonMore: 'Ещё',
  shortFilms: 'Короткометражки'
}

export const MESSAGES = {
  auth: 'Авторизация прошла успешно.',
  register: 'Регистрация прошла успешно.',
  logout: 'Выход из аккаунта прошел успешно.',
  userUpdate: 'Информация профиля успешно изменена.',
  searchError: 'Нужно ввести ключевое слово в поле поиска.',
  defaultError: 'Что-то пошло не так! Попробуйте ещё раз.',
  fetchErrorMessage: 'Ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз',
  searchVoidMessage: "Нужно ввести ключевое слово",
  moviesNotFound: "«Ничего не найдено»",
}