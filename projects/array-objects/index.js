/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   forEach([1, 2, 3], (el) => console.log(el))
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i++) {
    fn(array[i], i, array);
  }
  return array;
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   map([1, 2, 3], (el) => el ** 2) // [1, 4, 9]
 */
const newArray = [];
function map(array, fn) {
  for (let i = 0; i < array.length; i++) {
    // newArray.push(fn(array[i]))
    newArray[i] = fn(array[i], i, array);
  }
  return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array

 Пример:
   reduce([1, 2, 3], (all, current) => all + current) // 6
 */
let initialValue;
function reduce(array, fn, initial) {
  initialValue = initial !== undefined ? initial : array[0];
  for (let i = 0; i < array.length; i++) {
    initial ? i : (i = 1);
    initialValue = fn(initialValue, array[i], i, array);
  }
  return initialValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
const upperArray = [];
function upperProps(obj) {
  for (const key in obj) {
    upperArray.push(key.toUpperCase);
  }
  return upperArray;
}

/*
 Задание 5 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат

 Пример:
   const obj = createProxy({});
   obj.foo = 2;
   console.log(obj.foo); // 4
 */
function createProxy(obj) {
  return new Proxy(obj, {
    set(obj, key, value) {
      obj[key] = value ** 2;
      return true;
    },
  });
  // for (key in obj) {
  //   obj = {
  //     get key() {},
  //     set key(value) {
  //       return value *= value
  //     }
  //   }
  // }
  // // метод set
  // // obj.set = (a,b,c) => {}
  // return obj
}

export { forEach, map, reduce, upperProps, createProxy };
