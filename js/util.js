'use strict';

(function () {

  // Функция нахождения случайного целого числа
  function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Функция создания массива уникальных чисел
  function getUniqueArray(min, max) {
    var myArray = [];

    for (var j = 0; myArray.length < max; j++) {
      var randomNumber = getRandomNumber(min, max);
      var found = false;
      for (var i = 0; i < myArray.length; i++) {
        if (myArray[i] === randomNumber) {
          found = true;
          break;
        }
      }
      if (!found) {
        myArray[myArray.length] = randomNumber;
      }
    }
    return myArray.slice(0, 10);
  }

  window.util = {
    getUniqueArray: getUniqueArray
  };

})();
