// eslint no-use-before-define: 0
ymaps.ready(init);

function init() {
    const map = new ymaps.Map('map', {
        center: [56.824625, 60.609080],
        zoom: 12,
        // controls: ['searchControl']
    });

    // массив с данными 
    let dataPlace = [];
    class Data {
        constructor(coords, name, place, review) {
            this.coords = coords;
            this.name = name;
            this.place = place;
            this.review = review;
        }
    };

    const formMarkup = ['<form class="fb" id="fb">', '<h3>Отзыв:</h3>', '<input type="text" class="fb__input fb__input_1" placeholder="Укажите ваше имя">', '<input type="text" class="fb__input fb__input_2" placeholder="Укажите место">', '<input type="text" class="fb__input fb__input_3" placeholder="Оставить отзыв">', '<button class="fb__btn add" id="addBtn">Добавить</button>'];

    map.events.add('click', (e) => {
        const coords = e.get('coords');
        if (!map.balloon.isOpen()) {
            map.balloon.open(coords, {
                content: formMarkup.join('')
            }).then(() => {
                const addBtn = document.getElementById('addBtn');
                addBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const feedback = document.getElementById('fb');
                    let input_1 = feedback.elements[0].value;
                    let input_2 = feedback.elements[1].value;
                    let input_3 = feedback.elements[2].value;
                    if (input_1 && input_2 && input_3) {
                        dataPlace.push(new Data(coords, input_1, input_2, input_3));
                        console.log(dataPlace);
                        const mark = new ymaps.Placemark(coords, {
                            balloonContent: formMarkup.join('')
                        });
                        map.geoObjects.add(mark)
                        map.balloon.close();
                    } else {
                        console.log('заполните поля')
                    }
                });
            });
        } else {
            map.balloon.close()
        }
    });
    // map.geoObjects.events.add('click', (e) => {
    //     console.log('есть')
    // }

    // placemark.events.add('click', (e) => {

    // })
}


`Клик. Создается форма на месте курсора и плейсмарк, в который вносятся данные из заполненой формы`