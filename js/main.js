'use strict';
(function () {

  window.load.download(onSuccess, onError); // переменная массива фото берет данные из функции создания фото.
  var imgFilters = document.querySelector('.img-filters');
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
    renderPhotos(pictures, photosList);
    imgFilters.classList.remove('img-filters--inactive');
    clickFilterButton(pictures);
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

  function onEscapePress(evt) {
    if (evt.keyCode === 27) {
      window.bigPicture.close();
      document.removeEventListener('keydown', onEscapePress);
    }
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

  // Функция обработки кликов по кнопкам-фильтрам
  function clickFilterButton(photos) {
    var buttons = imgFilters.querySelectorAll('button');
    var sortPictures = [];

    var onButtonDefaultClick = window.debounce.debounce(function (evt) {
      onButtonClick(getDefaultPictures, evt);
    });

    var onButtonRandomClick = window.debounce.debounce(function (evt) {
      onButtonClick(getRandomPictures, evt);
    });

    var onButtonDiscussionClick = window.debounce.debounce(function (evt) {
      onButtonClick(getDiscussionPictures, evt);
    });

    function onButtonClick(callback, evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.type === 'button') {
        var activeButton = imgFilters.querySelector('.img-filters__button--active');
        activeButton.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        window.gallery.clearGallery('.picture', photosList);
        sortPictures = callback(photos);
        renderPhotos(sortPictures, photosList);

      }
    }

    function addEventElement(element, elementId, elementFunction) {
      if (element.id === elementId) {
        element.addEventListener('click', elementFunction);
      }
    }

    buttons.forEach(function (item) {
      addEventElement(item, 'filter-default', onButtonDefaultClick);
      addEventElement(item, 'filter-random', onButtonRandomClick);
      addEventElement(item, 'filter-discussed', onButtonDiscussionClick);
    });
  }
})();
