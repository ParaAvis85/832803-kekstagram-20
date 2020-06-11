'use strict';

var PHOTOS_COUNT = 25; // переменная количества обьектов по заданию

var MIN_LIKES_COUNT = 15; // минимальное количество лайков
var MAX_LIKES_COUNT = 200; // максимальное количество лайков
var MIN_AVATAR_COUNT = 1; // минимальное число аватара
var MAX_AVATAR_COUNT = 6; // максимальное число аватара
var descriptionPhoto = ''; // описание фотографии пустое
// функция случайного коментария
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
  for (var i = 0; i < 8; i++) {
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
      url: 'photos/' + (i + 1) + '.jpg', // здесь будет адресс фото photos/{{i}}.jpg где i = контактенация цикла количества фото по количеству в задании.
      description: descriptionPhoto,
      likes: getRandomCount(MIN_LIKES_COUNT, MAX_LIKES_COUNT), // здесь добавить из будущей  внешней функции которая через цикл создаст количество лайков случайно от 15 до 200.
      comments: getComments()
    };
    photosInfoCount.push(photosScetch); // обьект  который добавляем в массив через цикл.
  }
  return photosInfoCount; // видим число обьектов через массив
}

// выводим данные в консоль из функции создания массива из обьекта

var manyPhotos = getPhotos(); // переменная массива фото берет данные из функции создания фото.
var photosList = document.querySelector('.pictures'); //  ищем список фото
var photosTemplate = document.querySelector('#picture') //  ищем шаблон для рендера фото
.content.querySelector('.picture');

// функция отрисовки фото 1шт
function createPhoto(photo) {
  var photoItem = photosTemplate.cloneNode(true); // переменная клонирует все вложенности шаблона фото
  photoItem.querySelector('.picture__img').src = photo.url; // ищем и вносим фото в шаблон
  photoItem.querySelector('.picture__comments').textContent = photo.comments.length; // ищем и вносим коментарии в шаблн
  photoItem.querySelector('.picture__likes').textContent = photo.likes; // ищем и вносим количество лайков в шаблон
  return photoItem;
}

function renderPhotos(manyPhoto) {
  var templateFragment = document.createDocumentFragment(); // переменная с созданием документ фрагмента
  // цикл отрисовки массива в фото из переменной
  for (var i = 0; i < PHOTOS_COUNT; i++) {
    templateFragment.appendChild(createPhoto(manyPhoto[i]));
  }

  photosList.appendChild(templateFragment); // добавляем фрагмент с нужным количеством фото на страницу

}
renderPhotos(manyPhotos);

// функция открытия большой фотографии
function openLargePicture() {
  var bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden'); // удаляем класс скрытия большого фото
  bigPicture.querySelector('.big-picture__img img').src = manyPhotos[0].url; // ставим первое фото с массива фото
  bigPicture.querySelector('.likes-count').textContent = manyPhotos[0].likes; // ставим динамичесике лайки из функции создания количества случайных лайков
  bigPicture.querySelector('.comments-count').textContent = manyPhotos[0].comments.length; // ставим динамические коментарии из функции создания коментариев
}
openLargePicture();

var bigSocialComments = document.querySelector('.social__comments'); // ищем список коментариев ul
var moreUserComment = manyPhotos[0].comments[0]; // записываем в переменную случайные коментарии и фото
function renderCommentUser() {

  var newComment = document.createElement('li'); // создаем элемент списка "li", методом создания элемента и вносим в переменную
  newComment.classList.add('social__comment'); // добавляем класс для созданного "li"
  var commentAvatar = document.createElement('img'); // создаем тег "img" и добавляем в переменную методом создания элемента
  commentAvatar.classList.add('social__picture'); // добавляем тегу "img" класс методом создания класса
  commentAvatar.src = moreUserComment.avatar; // добавляем адресс src и саму аватарку для коментария в теге "img"
  commentAvatar.alt = moreUserComment.name; // добавляем льтернативный текст аватарке в теге "img"
  commentAvatar.style = 'width="35" height="35"'; // вносим размер аватарки в тег "img" инлайн стили
  newComment.append(commentAvatar); // добавляем весь "li" с "img" в конец списка "ul"

  var newTextComment = document.createElement('p'); // добавляем тег "p" в разметку элемента "li" метод создания элементов
  newTextComment.classList.add('social__text'); // добавляем класс тегу "p"
  newTextComment.textContent = moreUserComment.message; // вносим сам текст коментария в тег "p"
  newComment.append(newTextComment); // добавляем коментарий в тэлемент списка "li"

  return bigSocialComments.append(newComment); // возвращаем из функции в список "ul" полностью готовый "li" с "img" "p"
}
renderCommentUser(); // вызываем функцию создания разметки

document.querySelector('.social__caption').textContent = manyPhotos[0].description; // вставляем пустое описание фотографии
document.querySelector('.social__comment-count').classList.add('hidden'); // скрываем счетчик коментариев
document.querySelector('.comments-loader').classList.add('hidden'); // скрываем загрузку дополнительных коментариев
document.querySelector('body').classList.add('modal-open');
