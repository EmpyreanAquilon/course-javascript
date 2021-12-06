ymaps.ready(init);

function init() {
    const map = new ymaps.Map('map', {
        center: [56.824625, 60.609080],
        zoom: 12,
        // controls: ['searchControl']
    });

    // создал плейсмарк со своим контентом
    // const placemark_1 = new ymaps.Placemark([56.820842, 60.625474], {
    //     hintContent: 'Это Хинт',
    //     balloonContent: ['<form class="feedback">', '<h3>Отзыв:</h3>', '<input type="text" class="feedback__input" placeholder="Укажите ваше имя">', '<input type="text" class="feedback__input" placeholder="Укажите место">', '<input type="text" class="feedback__input" placeholder="Оставить отзыв">', '<button class="feedback__btn">Добавить</button>'].join(''),
    // });
    // map.geoObjects.add(placemark_1);

    map.events.add('click', (e) => {
        const coords = e.get('coords');
        // открываю балун со своими данными
        if (!map.balloon.isOpen()) {
            map.balloon.open(coords, {
                content: ['<form class="feedback">', '<h3>Отзыв:</h3>', '<input type="text" class="feedback__input_1" placeholder="Укажите ваше имя">', '<input type="text" class="feedback__input_2" placeholder="Укажите место">', '<input type="text" class="feedback__input_3" placeholder="Оставить отзыв">', '<button class="feedback__btn add" id="addBtn">Добавить</button>'].join('')
            });

        const addBtn = document.getElementById('addBtn');
        // addBtn.addEventListener('click', (e) => {
        //     e.preventDefault();
        // });
        console.log(document.getElementById('addBtn'))
            
        } else {
            map.balloon.close()
        }
        

        // получаем значения из полей ввода


        // и пытаюсь навесить обработчик на кнопку, но не успешно
        // const feedbackBtn = document.querySelectorAll('.feedback__btn');
        // if (feedbackBtn) {
        //     feedbackBtn.forEach((btn) => {
        //         btn.addEventListener('click', (e) => {
        //             e.preventDefault();
        //             console.log('есть кнопка')
        //         })
        //     }
        // )}

        // создаю свою форму, что не верно
        // var form = document.createElement('form');
        // document.body.prepend(form);
        // form.outerHTML = '<form class="feedback"><h3>Отзыв:</h3><input type="text" class="feedback__input" placeholder="Укажите ваше имя"><input type="text" class="feedback__input" placeholder="Укажите место"><input type="text" class="feedback__input" placeholder="Оставить отзыв"><button class="feedback__btn">Добавить</button></form>';



        // const mark = new ymaps.Placemark(coords, {
        //     balloonContent: ['<form class="feedback">', '<h3>Отзыв:</h3>', '<input type="text" class="feedback__input" placeholder="Укажите ваше имя">', '<input type="text" class="feedback__input" placeholder="Укажите место">', '<input type="text" class="feedback__input" placeholder="Оставить отзыв">', '<button class="feedback__btn add">Добавить</button>'].join('')
        // });
        // var addBtn = document
        // map.geoObjects.add(mark);
        // mark.balloon.open();
    });

    // placemark.events.add('click', (e) => {

    // })
}


`Клик. Создается форма на месте курсора и плейсмарк, в который вносятся данные из заполненой формы`