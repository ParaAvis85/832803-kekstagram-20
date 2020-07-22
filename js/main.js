'use strict';
(function () {

  var photosList = document.querySelector('.pictures'); //  ищем список фото
  var main = document.querySelector('main');
  var errorBlock = document.createElement('div');

  function renderPhotos(photos) {
    var templateFragment = document.createDocumentFragment(); // переменная с созданием документ фрагмента
    // цикл отрисовки массива в фото из переменной
    for (var i = 0; i < photos.length; i++) {
      templateFragment.appendChild(window.createPhoto(photos[i], i));
    }

    photosList.appendChild(templateFragment); // добавляем фрагмент с нужным количеством фото на страницу

  }

  // Функция создания копии массива фотографий с сервера
  function getDefaultPictures(pictures) {
    return pictures.slice();
  }

  // Функция нахождения 10 случайных неповторяющихся фотографий
  function getRandomPictures(pictures) {
    var randomUniqueArray = window.util.getUniqueArray(0, pictures.length);
    var randomPictures = [];
    randomUniqueArray.forEach(function (item) {
      return randomPictures.push(pictures[item]);
    });
    return randomPictures;
  }

  // Функция нахождения самых обсуждаемых фотографий (сортировка)
  function getDiscussionPictures(pictures) {
    var sortCommentPictures = pictures.slice();
    sortCommentPictures.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    return sortCommentPictures;
  }


  function onSuccess(pictures) {
    renderPhotos(pictures);
    window.sortermenu.display();
    window.sortermenu.clickFilterButton(pictures);
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
    if (evt.keyCode === 27) {
      window.bigPicture.close();
      document.removeEventListener('keydown', onEscapePress);
    }
  }

  window.main = {
    getDefaultPictures: getDefaultPictures,
    getRandomPictures: getRandomPictures,
    getDiscussionPictures: getDiscussionPictures,
    renderPhotos: renderPhotos
  };

  window.load.download(onSuccess, onError); // переменная массива фото берет данные из функции создания фото.

})();

