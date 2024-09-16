var swiper1 = new Swiper('.type-clin-main', {
    slidesPerView: 'auto', // чтобы не листалось по одному слайду надо здесь поставить авто и добавить freeMode true
    spaceBetween: 10, // отступ
    speed: 800, // Плавная прокрутка
    freeMode: true, // написал выше
    effect: 'slide', // Эффект плавного перехода
    touchRatio: 1.5, // Увеличение чувствительности при свайпе
    resistanceRatio: 0.8, // Плавное сопротивление при достижении конца слайдера
    // grabCursor: true, // Указатель мыши меняется на "руку"
    loop: false, // Отключаем бесконечную прокрутку
});

var swiper2 = new Swiper('.povtor-main', {
    slidesPerView: 'auto', // чтобы не листалось по одному слайду надо здесь поставить авто и добавить freeMode true
    spaceBetween: 10, // отступ
    speed: 800, // Плавная прокрутка
    freeMode: true, // написал выше
    effect: 'slide', // Эффект плавного перехода
    touchRatio: 1.5, // Увеличение чувствительности при свайпе
    resistanceRatio: 0.8, // Плавное сопротивление при достижении конца слайдера
    // grabCursor: true, // Указатель мыши меняется на "руку"
    loop: false, // Отключаем бесконечную прокрутку
});

// Для нав бара актив для кнопок
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // Удаляем класс 'active' у всех элементов
        navItems.forEach(nav => nav.classList.remove('active'));

        // Добавляем класс 'active' на кликнутый элемент
        item.classList.add('active');
    });
});

// Главная страница, попап информация о типе уборки
document.addEventListener("DOMContentLoaded", function() {
    const popup = document.getElementById("popup");
    const popupTriggers = document.querySelectorAll(".popup-trigger");
    const popupClose = document.getElementById("popup-close");

    // Открытие попапа при клике на кнопку
    popupTriggers.forEach(trigger => {
        trigger.addEventListener("click", function() {
            popup.classList.add("show"); // Показываем попап
        });
    });

    // Закрытие попапа при клике на крестик
    popupClose.addEventListener("click", function() {
        popup.classList.remove("show"); // Скрываем попап
    });

    // Закрытие попапа при клике на затемненный фон
    popup.addEventListener("click", function(e) {
        if (e.target === popup) {
            popup.classList.remove("show"); // Скрываем попап
        }
    });
});

// Главная страница, модальное окно с выбором города
document.addEventListener('DOMContentLoaded', function() {
    const openModalBtn = document.getElementById('open-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');

    openModalBtn.addEventListener('click', function(event) {
        event.preventDefault();
        modal.classList.add('show');
        overlay.classList.add('show');
    });

    closeModalBtn.addEventListener('click', function() {
        modal.classList.remove('show');
        overlay.classList.remove('show');
    });

    // Закрытие модального окна по свайпу вниз
    let startY;

    modal.addEventListener('touchstart', function(event) {
        startY = event.touches[0].clientY;
    });

    modal.addEventListener('touchend', function(event) {
        const endY = event.changedTouches[0].clientY;
        if (endY - startY > 50) { // Свайп вниз
            modal.classList.remove('show');
            overlay.classList.remove('show');
        }
    });

    // Закрытие модального окна при клике на фон
    overlay.addEventListener('click', function() {
        modal.classList.remove('show');
        overlay.classList.remove('show');
    });
});

// Страница Объекты удаление объектов
document.addEventListener('DOMContentLoaded', function() {
    // Используйте querySelectorAll для выбора всех кнопок открытия попапа
    const openPopupBtns = document.querySelectorAll('.object-open-delete-popup');
    const closePopupBtn = document.getElementById('object-cancel-delete');
    const confirmDeleteBtn = document.getElementById('object-confirm-delete');
    const popup = document.getElementById('object-delete-popup');
    const overlay = document.getElementById('object-delete-popup-overlay');

    // Назначьте обработчик для всех кнопок открытия попапа
    openPopupBtns.forEach(btn => {
        btn.addEventListener('click', function(event) {
            event.preventDefault();
            popup.classList.add('show');
            overlay.classList.add('show');
        });
    });

    // Закрытие попапа при нажатии на кнопку "Нет"
    closePopupBtn.addEventListener('click', function() {
        popup.classList.remove('show');
        overlay.classList.remove('show');
    });

    // Закрытие попапа при нажатии на фон
    overlay.addEventListener('click', function() {
        popup.classList.remove('show');
        overlay.classList.remove('show');
    });

    // Обработка подтверждения удаления
    confirmDeleteBtn.addEventListener('click', function() {
        alert('Объект удален!'); // Замените на логику подтверждения удаления
        popup.classList.remove('show');
        overlay.classList.remove('show');
    });
});


// Страница Добавление объекта (шаги, ботомбар, пагинация)




    // Страница Заказы
    let currentStep = 1;

    function nextStep() {
        document.getElementById('step-' + currentStep).classList.remove('active');
        currentStep++;
        if (currentStep > 4) {
            currentStep = 4; // Ограничиваем количество шагов
        }
        document.getElementById('step-' + currentStep).classList.add('active');
        updatePagination();
        updateButtonAndTotal();
    }

    function prevStep() {
        document.getElementById('step-' + currentStep).classList.remove('active');
        currentStep--;
        if (currentStep < 1) {
            currentStep = 1; // Ограничиваем количество шагов
        }
        document.getElementById('step-' + currentStep).classList.add('active');
        updatePagination();
        updateButtonAndTotal();
    }

    function updatePagination() {
        const indicators = document.querySelectorAll('.step-indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index + 1 === currentStep) {
                indicator.classList.add('active');
            }
        });
    }

    function updateButtonAndTotal() {
        const nextButton = document.getElementById('next-button');
        const publishButton = document.getElementById('publish-button');
        const totalAmount = document.querySelector('.total-amount');
        const pagination = document.querySelector('.pagination');

        if (currentStep === 4) {
            nextButton.style.display = 'none'; // Скрыть кнопку "Далее"
            publishButton.classList.add('active'); // Показать кнопку "Опубликовать заказ"
            totalAmount.classList.add('active'); // Показать "Итого"
            pagination.style.display = 'none'; // Скрыть пагинацию
        } else {
            nextButton.style.display = 'block'; // Показать кнопку "Далее"
            publishButton.classList.remove('active'); // Скрыть кнопку "Опубликовать заказ"
            totalAmount.classList.remove('active'); // Скрыть "Итого"
            pagination.style.display = 'flex'; // Показать пагинацию
        }
    }

    function publishOrder() {
        alert("Заказ опубликован!");
        // Здесь можно добавить логику для публикации заказа
    }

    document.addEventListener('DOMContentLoaded', function() {
        var blocks = document.querySelectorAll('.type-clean-block');
        blocks.forEach(function(block) {
            block.addEventListener('click', function() {
                blocks.forEach(function(b) { b.classList.remove('active'); });
                this.classList.add('active');
            });
        });
    });

    document.querySelectorAll('.dop-clean-card').forEach(function(card) {
        card.addEventListener('click', function() {
            // Удаляем класс 'active' у всех карточек
            document.querySelectorAll('.dop-clean-card').forEach(function(c) {
                c.classList.remove('active');
            });
            // Добавляем класс 'active' к текущей карточке
            this.classList.add('active');
        });
    });