/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */

// import './dnd.html';

const homeworkContainer = document.querySelector('#app');

document.addEventListener('mousemove', (e) => {});

function random(from, to) {
  return parseInt(from + Math.random() * to - from);
}

let currentDrag;
let startX = 0;
let startY = 0;

document.addEventListener('mousemove', (e) => {
  if (currentDrag) {
    currentDrag.style.left = e.clientX - startX + 'px';
    currentDrag.style.top = e.clientY - startY + 'px';
  }
});

function createDiv() {
  const newDiv = document.createElement('div');
  const minSize = 60;
  const maxSize = 200;
  const maxColor = 0xffffff;

  newDiv.className = 'draggable-div';
  newDiv.style.background = '#' + random(0, maxColor).toString(16);
  newDiv.style.left = random(0, window.innerWidth) + 'px';
  newDiv.style.top = random(0, window.innerHeight) + 'px';
  newDiv.style.width = random(minSize, maxSize) + 'px';
  newDiv.style.height = random(minSize, maxSize) + 'px';

  newDiv.addEventListener('mousedown', (e) => {
    currentDrag = newDiv;
    startX = e.offsetX;
    startY = e.offsetY;
  });
  newDiv.addEventListener('mouseup', () => (currentDrag = false));

  return newDiv;
}

const addDivButton = document.getElementById('addDiv');
addDivButton.addEventListener('click', function (e) {
  const newDiv = createDiv();
  homeworkContainer.appendChild(newDiv);
});

// function createDiv() {
//   const newDiv = document.createElement('div');
//   function generateNumber() {
//     let number = 0;
//     while (true) {
//       number = Math.round(Math.random()*100);
//       if (number >= 20 && number <= 80) {
//         return number
//       }
//     }
//   };
//   div.className = 'draggable-div';
//   newDiv.style.cssText = `width: ${generateNumber()}px;
//                           height: ${generateNumber()}px;
//                           background-color: rgb(${generateNumber()*2},${generateNumber()*2},${generateNumber()*2});
//                           position: absolute;
//                           top: ${generateNumber()}vh;
//                           left: ${generateNumber()}vw;
//                           cursor: grab`
//   addDivButton.addEventListener('click', function (e) {
//   homeworkContainer.appendChild(newDiv);
//   // генератор значения для стилей
//   newDiv.classList.add('newDiv');
//   // обработчик на сам элемент
//   newDiv.addEventListener('mousedown', () => {
//     newDiv.style.position = 'absolute';
//     newDiv.style.zIndex = '1000';
//     function moveAt(pageX, pageY) {
//       newDiv.style.left = pageX + 'px';
//       newDiv.style.top = pageY + 'px';
//     }
//     function onMouseMove(event) {
//       moveAt(event.pageX, event.pageY)
//     }
//     document.addEventListener('mousemove', onMouseMove);
//     newDiv.addEventListener('mouseup', () => document.removeEventListener('mousemove', onMouseMove))
//   })
// })
// }

// const addDivButton = homeworkContainer.querySelector('#addDiv');
// let newDiv = {};

// function movingElement(target) {
//   target.addEventListener('mousedown', (e) => {
//     function moveAt(event) {
//       target.style.left = event.clientX -40 + 'px';
//       target.style.top = event.clientY -40 + 'px';
//     }
//     document.addEventListener('mousemove', (e) => {
//       moveAt(e)
//     });
//     target.addEventListener('mouseup', (e) => {
//       document.removeEventListener('mousemove', (e) => {
//         moveAt(e)
//       });
//     });
//     target.ondragstart = function() {
//       return false;
//     };
//   });
// }

// const myElem = document.querySelector('.my-elem');

// movingElement(myElem)
// createDiv()

// export function createDiv() {}
