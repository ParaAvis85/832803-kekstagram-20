'use strict';
(function () {

  // выводим данные в консоль из функции создания массива из обьекта

  window.load.download(onSuccess, onError); // переменная массива фото берет данные из функции создания фото.
  var photosList = document.querySelector('.pictures'); //  ищем список фото

  function renderPhotos(photos) {
    var templateFragment = document.createDocumentFragment(); // переменная с созданием документ фрагмента
    // цикл отрисовки массива в фото из переменной
    for (var i = 0; i < photos.length; i++) {
      templateFragment.appendChild(window.createPhoto(photos[i], i));
    }

    photosList.appendChild(templateFragment); // добавляем фрагмент с нужным количеством фото на страницу

  }

  function onSuccess(pictures) {
    renderPhotos(pictures);
    photosList.addEventListener('click', function onCustomPhotoClick(evt) {
      var picture = evt.target.closest('.picture');
      if (picture) {
        var id = picture.dataset.id;
        window.bigPicture.open(pictures[id]);
        document.addEventListener('keydown', onEscapePress);
      }
    });
  }

  function onError(errorMessage) {
    var main = document.querySelector('main');
    var errorBlock = document.createElement('div');
    errorBlock.classList.add('error-block');
    errorBlock.textContent = errorMessage;
    main.insertAdjacentElement('afterbegin', errorBlock);
  }
  // module4-3

  // открытие открытие по ентеру
  // var onPreviewEnterPress = function (evt) {
  //   if (evt.keyCode === 13) {
  //     var picture = evt.target.closest('.picture');
  //     if (picture) {
  //       var id = picture.dataset.id;
  //       window.bigPicture.open(pictures[id]);
  //       document.addEventListener('keydown', onEscapePress);
  //     }
  //   }
  // };

  // открытие фото по одному из превью
  // function onCustomPhotoClick(evt) {
  //   // var picture = evt.target.closest('.picture');
  //   // if (picture) {
  //   //   var id = picture.dataset.id;
  //   //   window.bigPicture.open(manyPhotos[id]);
  //   //   document.addEventListener('keydown', onEscapePress);
  //   // }
  // }

  function onEscapePress(evt) {
    if (evt.keyCode === 27) {
      window.bigPicture.close();
      document.removeEventListener('keydown', onEscapePress);
    }
  }

  // обработчики для случайных фото
  // photosList.addEventListener('click', onCustomPhotoClick);
  // photosList.addEventListener('keydown', onPreviewEnterPress);
})();
