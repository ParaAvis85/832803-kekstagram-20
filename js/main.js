'use strict';

var PHOTOS_COUNT = 25; // переменная количества обьектов по заданию

var MIN_LIKES_COUNT = 15; // минимальное количество лайков
var MAX_LIKES_COUNT = 200; // максимальное количество лайков
var MIN_AVATAR_COUNT = 1; // минимальное число аватара
var MAX_AVATAR_COUNT = 6; // максимальное число аватара
var descriptionPhoto = ''; // описание фотографии пустое

function messageRandom() {
  var messagesArray = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var rnd = Math.floor(Math.random() * messagesArray.length);
  return messagesArray[rnd];
}

// Функция создания случайных имен
function nameRandom() {
  var namesArray = ['Артем', 'Петр', 'Иван', 'Александр', 'Евгений', 'Дарья', 'Светлана', 'Алефтина', 'Марья'];
  var rnd = Math.floor(Math.random() * namesArray.length);
  return namesArray[rnd];
}

// функция генерации случайных коментариев
function getComments() {
  var comments = [];
  for (var i = 0; i < 6; i++) {
    var comment = {
      avatar: 'img/avatar-' + getRandomCount(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT) + '.svg', // это строка, значение которой формируется по правилу img/avatar-{{случайное число от 1 до 6}}.svg  где данные  в скобках контактенация цикла количества фото по количеству в задании
      message: messageRandom(), // один или два разных коменнтария добавить случайно что означает тут будет функция которая будет с циклом рандомайзером
      name: nameRandom() // вызов функции случайных имен
    };
    comments.push(comment);
  }
  return comments;
}
// функция создания случайного количества лайков от 15 до 200
function getRandomCount(min, max) {
// получить случайное число от (min-0.5) до (max+0.5)
  var rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}


// функция создания фото
function getPhotos() {
  var photosInfoCount = []; // переменая и пустой массив выдает заданное в цикле число
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    var photosScetch = {
      url: 'url', // здесь будет адресс фото photos/{{i}}.jpg где i = контактенация цикла количества фото по количеству в задании.
      description: descriptionPhoto,
      likes: getRandomCount(MIN_LIKES_COUNT, MAX_LIKES_COUNT), // здесь добавить из будущей  внешней функции которая через цикл создаст количество лайков случайно от 15 до 200.
      comments: getComments()
    };
    photosInfoCount.push(photosScetch); // обьект  который добавляем в массив через цикл.
  }
  return photosInfoCount; // видим число обьектов через массив
}

getPhotos(); // выводим данные в консоль из функции создания массива из обьекта
