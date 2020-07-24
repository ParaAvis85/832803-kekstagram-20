'use strict';
(function () {
  var photosList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');

  var buttons = imgFilters.querySelectorAll('button');

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
  function setChangeCallback(photos, changeTypeCallback) {

    var sortPictures = [];

    var onButtonClick = window.debounce.bounce(function (evt) {
      if (evt.target.closest('#filter-default')) {
        onClick(getDefaultPictures, evt);
      }
      if (evt.target.closest('#filter-random')) {
        onClick(getRandomPictures, evt);
      }
      if (evt.target.closest('#filter-discussed')) {
        onClick(getDiscussionPictures, evt);
      }
    });

    function onClick(callback, evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.type === 'button') {
        var activeButton = imgFilters.querySelector('.img-filters__button--active');
        activeButton.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        window.gallery.clear('.picture', photosList);
        sortPictures = callback(photos);
        changeTypeCallback(sortPictures);
      }
    }

    function addEventElement(element, elementId, elementFunction) {
      if (element.id === elementId) {
        element.addEventListener('click', elementFunction);
      }
    }

    buttons.forEach(function (item) {
      addEventElement(item, 'filter-default', onButtonClick);
      addEventElement(item, 'filter-random', onButtonClick);
      addEventElement(item, 'filter-discussed', onButtonClick);
    });
  }

  function displayFilterMenu() {
    imgFilters.classList.remove('img-filters--inactive');
  }

  window.sortermenu = {
    setChangeCallback: setChangeCallback,
    display: displayFilterMenu
  };

})();
