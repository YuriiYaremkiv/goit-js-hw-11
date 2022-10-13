const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '30566581-29a7d3c7801683e2d838247de';

// function fetchRequest(optionSearch) {
//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${optionSearch}&image_type=photo&orientation=horizontal&safesearch=true`
//   ).then(response => response.json());
// }

// export default { fetchRequest };

export default class NewsApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 5;
  }

  fetchRequest() {
    return fetch(
      `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`
    ).then(response => response.json());
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
