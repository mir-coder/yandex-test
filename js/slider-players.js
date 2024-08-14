// Получаем все слайды
const slides = document.querySelectorAll('.slider__item');

// Получаем счетчик слайдов
const currentSlideElement = document.querySelector('.current-slide');
const totalSlidesElement = document.querySelector('.total-slides');

// Получаем кнопки навигации
const prevBtn = document.querySelector('.arrow-btn:first-child');
const nextBtn = document.querySelector('.arrow-btn:last-child');

// Текущий активный слайд
let currentSlideIndex = 0;

// Переменная для хранения количества видимых слайдов
let visibleSlidesCount = 3;

// Функция для определения количества видимых слайдов
function determineVisibleSlides() {
  if (window.innerWidth >= 1200) {
    visibleSlidesCount = 3;
  } else if (window.innerWidth >= 992) {
    visibleSlidesCount = 2;
  } else {
    visibleSlidesCount = 1;
  }
}

// Функция для обновления активного слайда
function updateActiveSlide(direction) {
  // Скрываем все слайды
  slides.forEach(slide => {
    slide.style.display = 'none';
    slide.classList.remove('slide-in-left', 'slide-in-right');
  });

  // Отображаем только необходимое количество активных слайдов
  for (let i = currentSlideIndex; i < currentSlideIndex + visibleSlidesCount; i++) {
    if (slides[i]) { // Проверяем, существует ли слайд
      slides[i].style.display = 'block';
      slides[i].offsetHeight; // Trigger reflow для применения анимации
      slides[i].classList.add(direction === 'prev' ? 'slide-in-left' : 'slide-in-right');
    }
  }

  // Обновляем счетчик слайдов
  currentSlideElement.textContent = currentSlideIndex + visibleSlidesCount;
  totalSlidesElement.textContent = slides.length;
}

// Обработчик клика на кнопки навигации
prevBtn.addEventListener('click', () => {
  if (currentSlideIndex > 0) {
    currentSlideIndex--;
    updateActiveSlide('prev');
    toggleButtonState();
  }
});

nextBtn.addEventListener('click', () => {
  if (currentSlideIndex < slides.length - visibleSlidesCount) {
    currentSlideIndex++;
    updateActiveSlide('next');
    toggleButtonState();
  }
});

function toggleButtonState() {
  prevBtn.classList.toggle('disabled', currentSlideIndex === 0);
  nextBtn.classList.toggle('disabled', currentSlideIndex >= slides.length - visibleSlidesCount);
}

// Обработчик изменения размера окна
window.addEventListener('resize', () => {
  determineVisibleSlides();
  // Обновляем слайды при изменении размера окна
  updateActiveSlide('next');
});

// Первоначальная установка
determineVisibleSlides();
updateActiveSlide('next');
