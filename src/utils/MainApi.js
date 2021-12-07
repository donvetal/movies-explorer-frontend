export class MainApi {
  constructor(config) {
    this.url = config.url;
    this.headers = config.headers;
  }

  register = (password, email, name) =>
    this._fetch('POST', 'include', '/signup', {password, email, name});

  authorize = (password, email) =>
    this._fetch('POST', 'include', '/signin', {password, email});

  logout = () => this._fetch('GET', 'include', '/signout');

  checkAuth = () => this._fetch('GET', 'include', '/check-auth');

  getProfile = () => this._fetch('GET', 'include', '/users/me');

  updateProfile = (name, email) =>
    this._fetch('PATCH', 'include', '/users/me', {name, email});

  getProfileMovies = () => this._fetch('GET', 'include', '/movies');


  setProfileMovie = (movie) =>
    this._fetch(
      'POST',
      'include',
      '/movies',
      movie);

  deleteProfileMovie = (movieId) => this._fetch('DELETE', 'include', '/movies/' + movieId);


  _fetch(method, credentials, path, body) {
    let options = {
      method,
      credentials,
      headers: this.headers,
    };
    if ((method === 'PATCH' || method === 'POST') && body) {
      options = {
        ...options,
        body: JSON.stringify(body)
      };
    }
    return fetch(this.url + path, options)
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}

const mainApi = new MainApi({
  url: 'https://api.kino-explorer.nomoredomains.club',
  headers: {
    'Content-type': 'application/json'
  }
});
export default mainApi;