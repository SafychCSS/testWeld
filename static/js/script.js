document.addEventListener('DOMContentLoaded', function () {
    const changeView = document.querySelector('.js-change-view'),
        productsList = document.querySelector('.products__list');

    // меняем вид блок-таблица
    changeView.onmouseenter = function () {
        productsList.classList.toggle('products__list--table');
    }

    productsList.addEventListener('click', function (e) {
        // клик по названию продукта
        if (e.target.classList.contains('js-edit')) {
            const title = e.target,
                // общий блок с названием продукта и формой
                titleWrap = e.target.closest('.product__title'),
                // форма
                formSend = titleWrap.querySelector('.js-send'),
                input = formSend.querySelector('input[type=text]');

            // показываем форму
            formSend.classList.add('active');
            // записываем в инпут название продукиа 
            input.value = getText(title);

            formSend.onsubmit = function (e) {
                e.preventDefault();
                let formData = new FormData(this);
                // скрываем форму
                formSend.classList.remove('active');
                // меняем название продукта
                title.textContent = getValue(input);
                // отправляем форму
                // ...
            }
        }
    });

    const products = document.querySelectorAll('.product');

    // даем всем товарам возможность перетаскиваться
    for (const product of products) {
        product.draggable = true;
        product.querySelector('.product__pic img').draggable = false;
    }

    // добавляем активный класс перемещаемому блоку
    productsList.addEventListener('dragstart', (e) => {
        e.target.classList.add('selected');
    });

    // удаляем класс
    productsList.addEventListener('dragend', (e) => {
        e.target.classList.remove('selected');
    });

    productsList.addEventListener('dragover', (e) => {
        e.preventDefault();

        // перетаскиваемый элемент
        const activeElement = productsList.querySelector('.selected');
        const currentElement = e.target;

        // проверяем что не выбранный элемент и что событие срабатывает на product
        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains('product');

        if (!isMoveable) {
            return;
        }

        // элемент перед которым нужно осуществить вставку
        const nextElement = (currentElement === activeElement.nextElementSibling) ?
            currentElement.nextElementSibling :
            currentElement;

        // вставляем
        productsList.insertBefore(activeElement, nextElement);
    });
});

function getText(el) {
    return el.textContent;
}

function getValue(el) {
    return el.value;
}