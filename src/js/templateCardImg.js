export function createGalleryMarkup(arr) {
  return arr.map(
    ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `<a class="photo-card__link" href=${largeImageURL}>
    <div class="photo-card">
      <div class="photo-card__tumb">
        <img class="photo-card__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
      </div>
      <ul class="photo-card__list">
        <li class="photo-card__item">
          <p class="photo-card__title">Likes</p>
          <p class="photo-card__value">${likes}</p>
        </li>
        <li class="photo-card__item">
          <p class="photo-card__title">Views</p>
          <p class="photo-card__value">${views}</p>
        </li> 
        <li class="photo-card__item">
          <p class="photo-card__title">Comments</p>
          <p class="photo-card__value">${comments}</p>
        </li>
        <li class="photo-card__item">
          <p class="photo-card__title">Downloads</p>
          <p class="photo-card__value">${downloads}</p>
        </li>     
      </ul>
    </div>
  </a>`}).join('');
}