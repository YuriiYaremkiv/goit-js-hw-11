import NewsApiService from './js/img-service';
import LoadMoreBtn from './js/load-more-btn';
import ImgTpl from './templates/templateCardImg.hbs';

// import SimpleLightbox from "simplelightbox";
// import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  form: document.querySelector('#search-form'),
  btnSearch: document.querySelector('.js-btn-search'),
  gallery: document.querySelector('.gallery'),
};

const newsApiService = new NewsApiService();

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.form.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchArticles);

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.target.elements.searchQuery.value.trim();

  if (newsApiService.query === '') {
    return alert('Введи что-то нормальное');
  }

  loadMoreBtn.show();
  newsApiService.resetPage();
  clearArticlesContainer();
  fetchArticles();
}

//   newsApiService
//     .fetchRequest()
//     .then(data => {
//       if (!data.total) {
//         console.log(
//           'Sorry, there are no images matching your search query. Please try again.'
//         );
//         return;
//       }

//       renderPhoto(data);
//     })
//     .catch(error => {
//       console.log(error);
//     });
// }

function fetchArticles() {
  loadMoreBtn.disable();
  newsApiService.fetchRequest().then(data => {
    appendArticlesMarkup(data.hits);
    loadMoreBtn.enable();
  });
}

function appendArticlesMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', ImgTpl(data));
}

function clearArticlesContainer() {
  refs.gallery.innerHTML = '';
}
