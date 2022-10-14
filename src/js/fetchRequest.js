import axios from 'axios';

export default class NewsApiService {
  baseURL = 'https://pixabay.com/api/';
  params = {
    key: '30566581-29a7d3c7801683e2d838247de',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    per_page: 40,
  };
  async getResponse(query) {
    if (query) {
      this.params.q = query;
    }

    const config = {
      params: this.params,
    };
    return await axios.get(this.baseURL, config);
  }

  increasePage() {
    this.params.page += 1;
  }

  setPage() {
    this.params.page = 1;
  }
}
