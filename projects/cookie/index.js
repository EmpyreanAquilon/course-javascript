/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

// import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');


let cookieArray = document.cookie.split('; ');
let cookieRow = null;

const cookie = {
  row() {
    cookieRow = document.createElement('tr');
    listTable.append(cookieRow);
  },
  name(name) {
    const cookieName = document.createElement('td');
    cookieName.textContent = `${name}`;
    if (cookieRow) {
      cookieRow.append(cookieName)
    } else {
      console.log('строка не создана!')
    }
  },
  value(value) {
    const cookieValue = document.createElement('td');
    cookieValue.textContent = `${value}`;
    if (cookieRow) {
      cookieRow.append(cookieValue)
    } else {
      console.log('строка не создана!')
    }
  },
  delete(name) {
    const cookieDelete = document.createElement('td');
    cookieRow.append(cookieDelete);
    const cookieDeleteBtn = document.createElement('button');
    cookieDelete.append(cookieDeleteBtn);
    cookieDeleteBtn.textContent = 'удалить';

    cookieDeleteBtn.addEventListener('click', () => {
      document.cookie = `${name}=deleted; max-age=0`;
      cookieRow.remove()
    })
  }
}

function renderList() {
  listTable.innerHTML = '';
  for (cook of cookieArray) {
    const [cookName, cookValue] = cook.split('=');
    cookie.row();
    cookie.name(cookName);
    cookie.value(cookValue);
    cookie.delete(cookName)
  }
}

if (!filterNameInput.value) {
  renderList()
}

filterNameInput.addEventListener('input', function (e) {
  listTable.innerHTML = '';
  if (filterNameInput.value) {
    for (cook of cookieArray) {
      const [cookName, cookValue] = cook.split('=');
      if (
        cookName.toLowerCase().includes(`${filterNameInput.value}`.toLowerCase()) || 
        cookValue.toLowerCase().includes(`${filterNameInput.value}`.toLowerCase())
      ) {
        cookie.row();
        cookie.name(cookName);
        cookie.value(cookValue);
        cookie.delete(cookName)
      } 
    }
    if (!listTable.innerHTML) {
        listTable.innerHTML = 'ничего не найдено';
    }
  } else {
    renderList()
  }
});

addButton.addEventListener('click', () => {
  const addNameInput = document.getElementById('add-name-input');
  const addValueInput = document.getElementById('add-value-input');
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  location.reload()
});

listTable.addEventListener('click', (e) => {});







