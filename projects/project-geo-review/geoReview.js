import InteractiveMap from "./interactiveMap.js";

// let template = `<div class="review-list"></div>
// <div class="form" data-role="review-form">
//     <h3>Отзыв:</h3>
//     <div class="field">
//         <input type="text" data-role="review-name" placeholder="Укажите ваше имя">
//     </div>
//     <div class="field">
//         <input type="text" data-role="review-place" placeholder="Укажите место">
//     </div>
//     <div class="field">
//         <textarea rows="5" data-role="review-text" placeholder="Оставьте отзыв"></textarea>
//     </div>
//     <button data-role="review-add">Добавить</button>
//     <span class="form-error"></span>
// </div>`


export default class GeoReview {
    constructor () {
        this.formTemplate = document.querySelector('#addFormTemplate').innerHTML;
        this.map = new InteractiveMap('map', this.onClick.bind(this));
        this.map.init().then(this.onInit.bind(this));
        this.geoList = this.callLocalStorage('get');
        
    }
    
    [{coords: [56.821707064402744,60.603930158691426], review: {name: 1, place: 2, text: 3}}]
        
    onInit() {
    //     const coords = await this.callApi('coords');
    //     for (const item of coords) {
    //         for (let i = 0; i < item.total; i++) {
    //             this.map.createPlacemark(item.coords);
    //         }
    //     }

        for (const item of this.geoList) {
            this.map.createPlacemark(item.coords)
        }
        document.addEventListener('click', this.onDocumentClick.bind(this));
    }

    

    callLocalStorage(method, data) {

        if (method === 'get') {
            return localStorage.getItem('geo');
        } else if (method === 'set') {
            geoList.push(data);
            localStorage.setItem('geo', geoList);

        }
    }

    createForm(coords, reviews) {
        const root = document.createElement('div');
        root.innerHTML = this.formTemplate;
        const reviewList = root.querySelector('.review-list')
        const reviewForm = root.querySelector('[data-role=review-form]');
        reviewForm.dataset.coords = JSON.stringify(coords);

        // for (const item of reviews) {
        //     const div = document.createElement('div');
        //     div.classList.add('review-item');
        //     div.innerHTML = `
        //     <div>
        //         <b>${item.name}</b> [${item.place}]
        //     </div>
        //     <div>${item.text}</div>
        //     `;
        //     reviewList.appendChild(div)
        // }

        return root;
    }

    onClick(coords, reviews) {
        const form = this.createForm(coords, reviews);
        this.map.openBalloon(coords, form.innerHTML);

        // if (!checkBalloon()) {

        // } else {
        //     closeBalloon();
        // }

        // при работе с сервером
        // const list = await this.callApi('list', {coords});
        // this.map.setBalloonContent(form.innerHTML);
    }

    async onDocumentClick(e) {
        if (e.target.dataset.role === 'review-add') {
            const reviewForm = document.querySelector('[data-role=review-form]');
            const coords = JSON.parse(reviewForm.dataset.coords);
            const data = {
                coords: coords,
                review: {
                    name: document.querySelector('[data-role=review-name]').value,
                    place: document.querySelector('[data-role=review-place]').value,
                    text: document.querySelector('[data-role=review-text]').value,
                },
            };


            // console.log(localStorage)
            // сохраняем в localStorage
            this.callLocalStorage('set', data);

            this.map.createPlacemark(coords);
            this.map.closeBalloon();

            // на случай хранения на сервере
            // try {
            //     await this.callApi('add', data);
            //     this.map.createPlacemark(coords);
            //     this.map.closeBalloon();
            // } catch (e) {
            //     const formError = document.querySelector('.form-error');
            //     formError.innerText = e.message;
            // }
        }
    }

    // на случай хранения на сервере
    // async callApi(method, body = {}) {
    //     const res = await fetch(`/geo-review/${method}`, {
    //         method: 'post',
    //         body: JSON.stringify(body),
    //     });
    //     return await res.json();
    // }

};