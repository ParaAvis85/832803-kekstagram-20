'use strict';


// Валидация хеш-тегов
// form.js
(function () {
  var MIN_SYMBOL = 2;
  var MAX_SYMBOL = 20;
  var MAX_HASHTAGS = 5;
  var textHashtag = document.querySelector('.text__hashtags');
  var re = /^(#[a-zA-Zа-яА-Я0-9]+ +){0,4}(#[a-zA-Zа-яА-Я0-9]+)?$/;

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
    } else if (newlotTextBlock.length > MAX_HASHTAGS) {
      textHashtag.setCustomValidity('Максимальное количество хештегов 5шт!');
    } else if (re.test(textHashtag.value)) {
      textHashtag.setCustomValidity('');
    } else {
      textHashtag.setCustomValidity('Неправильно набран хеш-тег! Пример: #module');
    }

    for (var i = 0; i < newlotTextBlock.length; i++) {
      if (newlotTextBlock[i].length > MAX_SYMBOL) {
        textHashtag.setCustomValidity('Максимальное количество знаков, не должно превышать 20шт включая знак #');
        break;
      } else if (newlotTextBlock[i].length < MIN_SYMBOL) {
        textHashtag.setCustomValidity('Хештег не может состоять из одного "#"');
      }
      break;
    }
  });
})();
