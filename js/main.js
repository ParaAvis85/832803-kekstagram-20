'use strict';
(function () {

  // выводим данные в консоль из функции создания массива из обьекта

  var manyPhotos = window.data.getPhotos(); // переменная массива фото берет данные из функции создания фото.
  var photosList = document.querySelector('.pictures'); //  ищем список фото

  function renderPhotos(manyPhoto) {
    var templateFragment = document.createDocumentFragment(); // переменная с созданием документ фрагмента
    // цикл отрисовки массива в фото из переменной
    for (var i = 0; i < window.constant.PHOTOS_COUNT; i++) {
      templateFragment.appendChild(window.createPhoto(manyPhoto[i]));
    }

    photosList.appendChild(templateFragment); // добавляем фрагмент с нужным количеством фото на страницу

  }
  renderPhotos(manyPhotos);

  // module4-3

  // открытие открытие по ентеру
  var onPreviewEnterPress = function (evt) {
    if (evt.keyCode === 13) {
      var picture = evt.target.closest('.picture');
      if (picture) {
        var id = picture.dataset.id;
        window.bigPicture.open(manyPhotos[id]);
        document.addEventListener('keydown', onEscapePress);
      }
    }
  };

  // открытие фото по одному из превью
  function onCustomPhotoClick(evt) {
    var picture = evt.target.closest('.picture');
    if (picture) {
      var id = picture.dataset.id;
      window.bigPicture.open(manyPhotos[id]);
      document.addEventListener('keydown', onEscapePress);
    }
  }

  function onEscapePress(evt) {
    if (evt.keyCode === 27) {
      window.bigPicture.close();
      document.removeEventListener('keydown', onEscapePress);
    }
  }

  // обработчики для случайных фото
  photosList.addEventListener('click', onCustomPhotoClick);
  photosList.addEventListener('keydown', onPreviewEnterPress);
})();
