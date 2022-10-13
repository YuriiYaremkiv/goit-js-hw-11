export function createGalleryMarkup(arr) {
  return arr.map(
    ({ largeImageURL, webformatURL, tags, likes, views, comments, downloads }) => {
    return `<a class="gallery__item" href=${largeImageURL}>
  <div class="thumb">
  <img class="gallery__image" src=${webformatURL} alt="${tags}" loading="lazy"/>
  </div>
  <div class="info">
    <p class="info__item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info__item">
      <b>Views</b> ${views}
    </p>
    <p class="info__item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info__item">
      <b>Downloads</b> ${downloads}
    </p>
  </div>
</a>`}).join('');
}
