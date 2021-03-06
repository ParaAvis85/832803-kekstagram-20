'use strict';

(function () {
  var controlBigger = document.querySelector('.scale__control--bigger');
  var controlSmaller = document.querySelector('.scale__control--smaller');

  var controlValue = document.querySelector('.scale__control--value');
  var resizeImg = document.querySelector('.img-upload__preview img');

  var upLoadInputField = document.querySelector('#upload-file');
  var openOverlayChangeImage = document.querySelector('.img-upload__overlay');
  var buttonEditClose = document.querySelector('#upload-cancel');
  var resizeImage = document.querySelector('.img-upload__preview');
  var hashtagInput = document.querySelector('.text__hashtags');


  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');
  var effectLevelPin = document.querySelector('.effect-level__pin');
  var effectLevelLine = document.querySelector('.effect-level__line');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var imgUploadEffectLevel = document.querySelector('.img-upload__effect-level');
  var textArea = document.querySelector('.text__description');

  // функция открытия редактора фото
  function openEditPhoto() {
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
    resetCurrentEffect('none');
    changePictureScale(100);
    document.removeEventListener('keydown', openEditImageEscPress);
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

  function setFilterValue(filterName, percent) {
    switch (filterName) {
      case 'none':
        imgUploadPreview.style.filter = '';
        break;
      case 'chrome':
        imgUploadPreview.style.filter = 'grayscale(' + percent / 100 + ')';
        break;
      case 'sepia':
        imgUploadPreview.style.filter = 'sepia(' + percent / 100 + ')';
        break;
      case 'marvin':
        imgUploadPreview.style.filter = 'invert(' + percent + '%)';
        break;
      case 'phobos':
        imgUploadPreview.style.filter = 'blur(' + (percent * 3 / 100) + 'px)';
        break;
      case 'heat':
        imgUploadPreview.style.filter = 'brightness(' + percent * 3 / 100 + ')';
        break;
    }
  }

  function resetCurrentEffect(filterName) {
    effectLevelValue.value = window.constant.MAX_VALUE;
    effectLevelPin.style.left = window.constant.MAX_VALUE + '%';
    effectLevelDepth.style.width = window.constant.MAX_VALUE + '%';
    imgUploadPreview.className = '';
    imgUploadPreview.style.filter = '';
    imgUploadPreview.classList.add('effects__preview--' + filterName);
    if (filterName !== 'none') {
      imgUploadEffectLevel.classList.remove('hidden');
    } else {
      imgUploadEffectLevel.classList.add('hidden');
    }
  }


  function getLevelPin(x) {
    var positionX = x === undefined ? effectLevelPin.offsetLeft : x;
    var lineWidth = effectLevelLine.offsetWidth;
    var percent = Math.round(100 * positionX / lineWidth);
    return percent;
  }

  function changeFilterValue() {
    var current = document.querySelector('.effects__radio:checked');
    var percent = getLevelPin();
    effectLevelValue.value = percent;
    setFilterValue(current.value, percent);
  }

  function setUploadEffectLevelHidden() {
    imgUploadEffectLevel.classList.add('hidden');
  }

  setUploadEffectLevelHidden();

  // черновой вариант открытия скрытия фото для редактирования
  function openEditImageEscPress(evt) {
    if (evt.keyCode === window.constant.ESC_BUTTON && evt.target !== hashtagInput && evt.target !== textArea) {
      evt.preventDefault();
      closeEditPhoto();
    }
  }

  // обработчик с вызовом функции отрытия редактора
  upLoadInputField.addEventListener('change', function () {
    openEditPhoto();
  });

  // обработчик закрытия через клавиши esc и enter
  buttonEditClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === window.constant.ENTER_BUTTON) {
      closeEditPhoto();
    }
  });

  // обработчик с закрытием функции редактирования фото
  buttonEditClose.addEventListener('click', function () {
    closeEditPhoto();
  });

  // Обработчик увеличения фото
  controlBigger.addEventListener('click', function () {
    pictureIncreaseScale();
  });
  // обработчик уменьшения фото
  controlSmaller.addEventListener('click', function () {
    pictureDecreaseScale();
  });

  effectsList.addEventListener('change', function (evt) {
    resetCurrentEffect(evt.target.value);
  });

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX
      };
      startCoords = {
        x: moveEvt.clientX
      };

      var newX = effectLevelPin.offsetLeft - shift.x;

      var newLevel = getLevelPin(newX);

      if (newLevel >= 0 && newLevel <= window.constant.MAX_VALUE) {
        effectLevelPin.style.left = newX + 'px';
        effectLevelDepth.style.width = newX + 'px';
      }

      changeFilterValue();
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.editphoto = {
    closePopup: closeEditPhoto
  };

})();
