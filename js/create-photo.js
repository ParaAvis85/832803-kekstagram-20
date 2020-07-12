'use strict';

(function () {

  // функция отрисовки фото 1шт
  function createPhoto(photo, id) {
    var photosTemplate = document.querySelector('#picture') //  ищем шаблон для рендера фото
    .content.querySelector('.picture');
    var photoItem = photosTemplate.cloneNode(true); // переменная клонирует все вложенности шаблона фото
    photoItem.querySelector('.picture__img').src = photo.url; // ищем и вносим фото в шаблон
    photoItem.querySelector('.picture__comments').textContent = photo.comments.length; // ищем и вносим коментарии в шаблн
    photoItem.querySelector('.picture__likes').textContent = photo.likes; // ищем и вносим количество лайков в шаблон
    photoItem.dataset.id = id;
    return photoItem;
  }

  window.createPhoto = createPhoto;
})();
