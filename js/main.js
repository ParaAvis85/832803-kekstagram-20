"use strict"

var PHOTOS_COUNT = 25; //переменная количества обьектов по заданию
// функция создания массива из обьектов
function getPhotos () {
  var photosInfoCount = []; //переменая и пустой массив выдает заданное в цикле число
  for (var i = 0; i < PHOTOS_COUNT + 1; i++) {
    var photosScetch = {} //Обьект для генерации в будущем
    photosInfoCount.push(photosScetch);//обьект  который добавляем в массив через цикл.
  }
  return photosInfoCount;//видим число обьектов через массив
}

console.log(getPhotos());//выводим данные в консоль из функции создания массива из обьекта
