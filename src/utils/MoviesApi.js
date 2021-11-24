export class MoviesApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  getMoviesList = () => this._fetch('GET', '/beatfilm-movies');

  _fetch(method, path) {
    let options = {
      method,
      headers: this.headers,
    };
    return fetch(this.url + path, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}

const moviesApi = new MoviesApi({
  url: 'https://api.nomoreparties.co',
  headers: {
    'Content-type': 'application/json',
  }
});
export default moviesApi;