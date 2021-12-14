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
        this.geoStorage = this.loadStorage();
        this.formTemplate = document.querySelector('#addFormTemplate').innerHTML;
        this.map = new InteractiveMap('map', this.onClick.bind(this), this.geoStorage);
        this.map.init().then(this.onInit.bind(this));
        this.clearBtn()
    }
    
    clearBtn() {
        const clrBtn = document.createElement('button');
        clrBtn.classList.add('clrBtn');
        clrBtn.textContent = 'Очистить';
        document.body.appendChild(clrBtn);
        clrBtn.addEventListener('click', () => {
            localStorage.clear();
            location.reload();
            this.geoStorage = this.loadStorage();
        })
    }

    loadStorage() {
        if (!localStorage.getItem('geoLocal')) {
            localStorage.setItem('geoLocal', JSON.stringify([]))
        } else {
            this.geoStorage = JSON.parse(localStorage.getItem('geoLocal'));
        };

        return this.geoStorage
    }

    onInit() {
        if (!localStorage.getItem('geoLocal')) {
            localStorage.setItem('geoLocal', JSON.stringify([]))
        } else {
            this.geoStorage = JSON.parse(localStorage.getItem('geoLocal'));
            console.log('Массив с геообъектами:');
            console.log(this.geoStorage);
        };

        for (const item of this.geoStorage) {
            this.map.createPlacemark(item.coords);
        };
        
        document.addEventListener('click', this.onDocumentClick.bind(this));
    }

    createForm(coords, storage) {
        const root = document.createElement('div');
        root.innerHTML = this.formTemplate;
        const reviewList = root.querySelector('.review-list')
        const reviewForm = root.querySelector('[data-role=review-form]');
        reviewForm.dataset.coords = JSON.stringify(coords);

        if (storage.length) {
            for (const item of storage) {
                if (JSON.stringify(coords) === JSON.stringify(item.coords)) {
                    for (const rev of item.reviews) {
                        const review = document.createElement('div');
                        review.classList.add('review-item');
                        review.innerHTML = `
                        <div>
                            <b>${rev.name}</b> [${rev.place}]
                        </div>
                        <div>${rev.text}</div>
                        `;
                        reviewList.appendChild(review)
                    }
                }
            }
        }

        return root;
    }

    onClick(coords, storage) {
        const form = this.createForm(coords, storage);

        if (!this.map.checkBalloon()) {
            this.map.openBalloon(coords, form.innerHTML);
        } else {
            this.map.closeBalloon();
        }
    }

    geoData(storage, data, coords) {
        for (const item of storage) {
            if (JSON.stringify(coords) === JSON.stringify(item.coords)) {
                item.reviews = item.reviews.concat(data.reviews);
                localStorage.setItem('geoLocal', JSON.stringify(this.geoStorage));
                console.log(this.geoStorage)
                return null
            }
        }
        this.geoStorage.push(data);
        localStorage.setItem('geoLocal', JSON.stringify(this.geoStorage));
        // console.log(JSON.parse(localStorage.getItem('geoLocal')));
    }

    onDocumentClick(e) {
        if (e.target.dataset.role === 'review-add') {
            const reviewForm = document.querySelector('[data-role=review-form]');
            const coords = JSON.parse(reviewForm.dataset.coords);
            const data = {
                coords: coords,
                reviews: [
                    {
                        name: reviewForm.querySelector('[data-role=review-name]').value,
                        place: reviewForm.querySelector('[data-role=review-place]').value,
                        text: reviewForm.querySelector('[data-role=review-text]').value,
                    },
                ],
                
            };
            this.geoData(this.geoStorage, data, coords);
            this.map.createPlacemark(coords);
            this.map.closeBalloon();
        }
    }
};