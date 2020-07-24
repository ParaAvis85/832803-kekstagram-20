'use strict';


// Валидация хеш-тегов
// form.js
(function () {

  var textHashtag = document.querySelector('.text__hashtags');
  var re = /^(#[a-zA-Zа-яА-Я0-9]+ +){0,4}(#[a-zA-Zа-яА-Я0-9]+)?$/;
  var form = document.querySelector('.img-upload__form');

  textHashtag.addEventListener('input', function () {
    var textBlock = textHashtag.value;
    var lotTextBlock = textBlock.split(/ +/g);
    var newlotTextBlock = lotTextBlock.filter(function (elem, pos) {
      return lotTextBlock.indexOf(elem) === pos;
    });

    // условие валидации хештегов
    var filterMassTextFill = (newlotTextBlock.length !== lotTextBlock.length);
    if (filterMassTextFill) {
      textHashtag.setCustomValidity('Хештеги не должны повторяться!');
    } else if (newlotTextBlock.length > window.constant.MAX_HASHTAGS) {
      textHashtag.setCustomValidity('Максимальное количество хештегов 5шт!');
    } else if (re.test(textHashtag.value)) {
      textHashtag.setCustomValidity('');
    } else {
      textHashtag.setCustomValidity('Неправильно набран хеш-тег! Пример: #module');
    }

    for (var i = 0; i < newlotTextBlock.length; i++) {
      if (newlotTextBlock[i].length > window.constant.MAX_SYMBOL) {
        textHashtag.setCustomValidity('Максимальное количество знаков, не должно превышать 20шт включая знак #');
        break;
      } else if (newlotTextBlock[i].length < window.constant.MIN_SYMBOL) {
        textHashtag.setCustomValidity('Хештег не может состоять из одного "#"');
      }
      break;
    }
  });

  form.addEventListener('submit', function (evt) {
    window.load.upload(new FormData(form), function () {
      window.editphoto.closePopup();
      window.messages.openSuccessMessage();
    }, function () {
      window.editphoto.closePopup();
      window.messages.openErrorMessage();
    });
    evt.preventDefault();
  });
})();
