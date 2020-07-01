'use strict';

(function () {
  var controlBigger = document.querySelector('.scale__control--bigger');
  var controlSmaller = document.querySelector('.scale__control--smaller');
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var controlValue = document.querySelector('.scale__control--value');
  var resizeImg = document.querySelector('.img-upload__preview img');

  var upLoadInputField = document.querySelector('#upload-file');
  var openOverlayChangeImage = document.querySelector('.img-upload__overlay');
  var buttonEditClose = document.querySelector('#upload-cancel');
  var resizeImage = document.querySelector('.img-upload__preview');
  var hashtagInput = document.querySelector('.text__hashtags');

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

  // функция извенения класса эффектов
  function setEffectClassName(value) {
    imgUploadPreview.className = '';
    var className = 'effects__preview--' + value;
    imgUploadPreview.classList.add(className);
  }
  // функция увеличения фото
  function pictureIncreaseScale() {
    var scaleValue = parseInt(controlValue.value, 10);
    scaleValue += window.constant.SCALE_STEP;
    if (scaleValue > window.constant.MAX_SCALE_VALUE) {
      scaleValue = window.constant.MAX_SCALE_VALUE;
    }
    changePictureScale(scaleValue);
  }
  // функция уменьшения фото
  function pictureDecreaseScale() {
    var scaleValue = parseInt(controlValue.value, 10);
    scaleValue -= window.constant.SCALE_STEP;
    if (scaleValue <= window.constant.MIN_SCALE_VALUE) {
      scaleValue = window.constant.MIN_SCALE_VALUE;
    }
    changePictureScale(scaleValue);
  }
  // счетчик размера
  function changePictureScale(value) {
    controlValue.value = value + '%';
    resizeImg.style.transform = 'scale(' + (value / 100) + ')';
  }

  window.editPhoto = {
    setEffectClassName: setEffectClassName,
    pictureIncreaseScale: pictureIncreaseScale,
    pictureDecreaseScale: pictureDecreaseScale,
  };
})();
