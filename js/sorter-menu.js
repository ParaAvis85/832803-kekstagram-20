'use strict';
(function () {
  var photosList = document.querySelector('.pictures');
  var imgFilters = document.querySelector('.img-filters');

  var buttons = imgFilters.querySelectorAll('button');
  // Функция обработки кликов по кнопкам-фильтрам
  function clickFilterButton(photos) {

    var sortPictures = [];

    var onButtonDefaultClick = window.debounce.debounce(function (evt) {
      onButtonClick(window.main.getDefaultPictures, evt);
    });

    var onButtonRandomClick = window.debounce.debounce(function (evt) {
      onButtonClick(window.main.getRandomPictures, evt);
    });

    var onButtonDiscussionClick = window.debounce.debounce(function (evt) {
      onButtonClick(window.main.getDiscussionPictures, evt);
    });

    function onButtonClick(callback, evt) {
      evt.preventDefault();
      var target = evt.target;
      if (target.type === 'button') {
        var activeButton = imgFilters.querySelector('.img-filters__button--active');
        activeButton.classList.remove('img-filters__button--active');
        target.classList.add('img-filters__button--active');
        window.gallery.clear('.picture', photosList);
        sortPictures = callback(photos);
        window.main.renderPhotos(sortPictures, photosList);
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

  function displayFilterMenu() {
    imgFilters.classList.remove('img-filters--inactive');
  }

  window.sortermenu = {
    clickFilterButton: clickFilterButton,
    display: displayFilterMenu
  };
})();
