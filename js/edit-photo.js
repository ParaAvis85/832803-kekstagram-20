'use strict';

(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview img');
  var controlValue = document.querySelector('.scale__control--value');
  var resizeImg = document.querySelector('.img-upload__preview img');
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
