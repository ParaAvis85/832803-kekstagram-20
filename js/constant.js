'use strict';
(function () {

  var PHOTOS_COUNT = 25; // переменная количества обьектов по заданию

  var MIN_LIKES_COUNT = 15; // минимальное количество лайков
  var MAX_LIKES_COUNT = 200; // максимальное количество лайков
  var MIN_AVATAR_COUNT = 1; // минимальное число аватара
  var MAX_AVATAR_COUNT = 6; // максимальное число аватара

  var COUNT_COMMENT = 6;

  var MIN_SCALE_VALUE = 25;
  var MAX_SCALE_VALUE = 100;
  var SCALE_STEP = 25;


  window.constant = {
    photosCount: PHOTOS_COUNT,
    minLikesCount: MIN_LIKES_COUNT,
    maxLikesCount: MAX_LIKES_COUNT,
    minAvatarCount: MIN_AVATAR_COUNT,
    maxAvatarCount: MAX_AVATAR_COUNT,
    countComment: COUNT_COMMENT,
    minScaleValue: MIN_SCALE_VALUE,
    maxScaleValue: MAX_SCALE_VALUE,
    scaleStep: SCALE_STEP,
  };
})();

