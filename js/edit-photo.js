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
    pictureIncreaseScale();
  });
  // обработчик уменьшения фото
  controlSmaller.addEventListener('click', function () {
    pictureDecreaseScale();
  });

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

  imgUploadEffectLevel.classList.add('hidden');

  function resetCurrentEffect(evt) {
    effectLevelValue.value = 100;
    effectLevelPin.style.left = 100 + '%';
    effectLevelDepth.style.width = 100 + '%';
    imgUploadPreview.classList = '';
    imgUploadPreview.style.filter = '';
    imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
    if (evt.target.value !== 'none') {
      imgUploadEffectLevel.classList.remove('hidden');
    } else {
      imgUploadEffectLevel.classList.add('hidden');
    }
  }
  effectsList.addEventListener('change', resetCurrentEffect);

  function getLevelPin() {
    var positionX = effectLevelPin.offsetLeft;
    var lineWidth = effectLevelLine.offsetWidth;
    var percent = Math.round(100 * positionX / lineWidth);
    effectLevelValue.value = percent;
    return percent;
  }

  function changeFilterValue() {
    var current = document.querySelector('.effects__radio:checked');
    setFilterValue(current.value, getLevelPin());
  }

  effectLevelPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var lineWidth = effectLevelLine.offsetWidth;
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y
      };
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      if (effectLevelPin.offsetLeft < 0) {
        effectLevelPin.style.left = 0 + 'px';
        effectLevelDepth.style.width = 0 + 'px';
      } else if (effectLevelPin.offsetLeft > lineWidth) {
        effectLevelPin.style.left = lineWidth + 'px';
        effectLevelDepth.style.width = lineWidth + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
        effectLevelDepth.style.width = (effectLevelPin.offsetLeft - shift.x) + 'px';
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
})();
