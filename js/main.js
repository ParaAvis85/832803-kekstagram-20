'use strict';
(function () {

  var photosList = document.querySelector('.pictures'); //  ищем список фото
  var main = document.querySelector('main');
  var errorBlock = document.createElement('div');

  function renderPhotos(photos) {
    var templateFragment = document.createDocumentFragment(); // переменная с созданием документ фрагмента
    // цикл отрисовки массива в фото из переменной
    for (var i = 0; i < photos.length; i++) {
      templateFragment.appendChild(window.createPhoto(photos[i]));
    }
    photosList.appendChild(templateFragment); // добавляем фрагмент с нужным количеством фото на страницу
  }

  function onSuccess(pictures) {
    pictures.forEach(function (picture, index) {
      picture.id = index;
    });
    renderPhotos(pictures);
    window.sortermenu.display();
    window.sortermenu.setChangeCallback(pictures, function (photos) {
      renderPhotos(photos);
    });
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
    errorBlock.classList.add('error-block');
    errorBlock.textContent = errorMessage;
    main.insertAdjacentElement('afterbegin', errorBlock);
  }

  function onEscapePress(evt) {
    if (evt.keyCode === window.constant.ESC_BUTTON) {
      window.bigPicture.close();
      document.removeEventListener('keydown', onEscapePress);
    }
  }

  window.load.download(onSuccess, onError); // переменная массива фото берет данные из функции создания фото.

})();

