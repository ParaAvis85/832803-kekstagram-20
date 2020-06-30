'use strict';
(function () {
  var controlBigger = document.querySelector('.scale__control--bigger');
  var controlSmaller = document.querySelector('.scale__control--smaller');


  var upLoadInputField = document.querySelector('#upload-file');
  var openOverlayChangeImage = document.querySelector('.img-upload__overlay');
  var buttonEditClose = document.querySelector('#upload-cancel');
  var resizeImage = document.querySelector('.img-upload__preview');
  var hashtagInput = document.querySelector('.text__hashtags');

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


  // черновой вариант открытия скрытия фото для редактирования

  function openEditImageEscPress(evt) {
    if (evt.keyCode === 27 && evt.target !== hashtagInput) {
      evt.preventDefault();
      closeEditPhoto();
    }
  }

  // функция открытия редактора фото
  function openEditphoto() {
    openOverlayChangeImage.classList.remove('hidden');
    document.body.classList.add('modal-open');

    document.addEventListener('keydown', openEditImageEscPress);
  }

  // функция закрытия редактора фото
  function closeEditPhoto() {
    openOverlayChangeImage.classList.add('hidden');
    document.body.classList.remove('modal-open');
    upLoadInputField.value = '';
    resizeImage.className = '';

    document.removeEventListener('keydown', openEditImageEscPress);
  }

  // обработчик с вызовом функции отрытия редактора
  upLoadInputField.addEventListener('change', function () {
    openEditphoto();
  });

  // обработчик закрытия через клавиши esc и enter
  buttonEditClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 13) {
      closeEditPhoto();
    }
  });

  // обработчик с закрытием функции редактирования фото
  buttonEditClose.addEventListener('click', function () {
    closeEditPhoto();
  });


  // Обработчик увеличения фото
  controlBigger.addEventListener('click', function () {
    window.editPhoto.pictureIncreaseScale();
  });
  // обработчик уменьшения фото
  controlSmaller.addEventListener('click', function () {
    window.editPhoto.pictureDecreaseScale();
  });

  // добавление эффектов черновой вариант
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevel;
  // расчет растояния пина от крайнего левого положения до центра пина
  effectLevelPin.addEventListener('mouseup', function () {
    effectLevel = Math.floor((effectLevelPin.offsetLeft + (effectLevelPin.offsetWidth / 2)) / effectLevelPin.offsetParent.offsetWidth * 100);
    effectLevelValue.value = effectLevel;
  });

  var effectsList = document.querySelector('.effects__list');

  // обработчик события на клик для эффектов
  effectsList.addEventListener('click', function (evt) {
    if (evt.target && evt.target.matches('input[type="radio"]')) {
      window.editPhoto.setEffectClassName(evt.target.value);
      effectLevelValue.value = 100;
    }
  });


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
