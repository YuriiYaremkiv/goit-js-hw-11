import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { createGalleryMarkup } from './templateCardImg';
import NewsApiService from './fetchRequest';
import LoadMoreBtn from './load-more-btn';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
var lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const refs = {
  formSearch: document.querySelector('#search-form'),
  input: document.querySelector('[name="searchQuery"]'),
  btnSearch: document.querySelector('.btn-search'),
  gallery: document.querySelector('.js-gallery'),
  btnLoadMore: document.querySelector('[data-action="load-more"]'),
};

refs.formSearch.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

async function onSearch(e) {
  e.preventDefault();
  clearImgContainer();
  loadMoreBtn.hide();
  
  const query = e.target.elements.searchQuery.value.trim();
  if (!query) {
    Notify.info('Please enter your request!');
    loadMoreBtn.hide();
    return;
  }

  newsApiService.setPage();
  
  try {
    const response = await newsApiService.getResponse(query);
    const { hits, totalHits } = response.data;
    if (!hits.length) {
      Notify.warning('Sorry, there are no images matching your search query. Please try again.');
      loadMoreBtn.hide();
      return;
    }
    
    Notify.success(`Hooray! We found ${totalHits} images.`);  
    renderImages(hits);
    newsApiService.increasePage();
    refs.input.value = '';
    if (totalHits > 40 ) {
      loadMoreBtn.show();
    }
  } catch (err) {
      Notify.warning('Sorry, site don`t work. Please try again.');
      loadMoreBtn.hide();
  }
}

function renderImages(arr) {
  appendImgMarkup(createGalleryMarkup(arr));
  lightbox.refresh();
}

async function fetchImages() {
  loadMoreBtn.disable();
  try {
    const response = await newsApiService.getResponse();
    const { hits, totalHits } = response.data;
    renderImages(hits);
    loadMoreBtn.enable();
    newsApiService.increasePage();

    const { height } = refs.gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: height * 3,
      behavior: 'smooth',
    });

    const {
      params: { page, per_page },
    } = newsApiService;
    if (page > totalHits / per_page) {
      loadMoreBtn.hide();
    }
  } catch (err) {
    Notify.warning('Sorry, site don`t work. Please try again.');
    loadMoreBtn.hide();
  }
}

function clearImgContainer() {
  refs.gallery.innerHTML = '';
}

function appendImgMarkup(data) {
  refs.gallery.insertAdjacentHTML('beforeend', data);
}