// //------------------ Слайдер "Этапы"-------------------------
function mobileSlider() {
  const stagesBlockItems = document.querySelectorAll('.stages-block__item');
  const stagesBlockContainer = document.querySelector('.stages-block__items');

  // Создаем контейнер для слайдера
  const sliderContainer = document.createElement('div');
  sliderContainer.classList.add('slider-container');

  // Создаем контейнер для кнопок
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('slider-buttons');

  // Создаем слайды и добавляем их в контейнер
  const slides = [];

  // Первый слайд (1 и 2 блоки)
  const slide1 = document.createElement('div');
  slide1.classList.add('slide-item');
  slide1.appendChild(stagesBlockItems[0].cloneNode(true));
  slide1.appendChild(stagesBlockItems[1].cloneNode(true));
  slides.push(slide1);
  sliderContainer.appendChild(slide1);

  // Второй слайд (3 блок)
  const slide2 = document.createElement('div');
  slide2.classList.add('slide-item');
  slide2.appendChild(stagesBlockItems[2].cloneNode(true));
  slides.push(slide2);
  sliderContainer.appendChild(slide2);

  // Третий слайд (4 и 5 блоки)
  const slide3 = document.createElement('div');
  slide3.classList.add('slide-item');
  slide3.appendChild(stagesBlockItems[3].cloneNode(true));
  slide3.appendChild(stagesBlockItems[4].cloneNode(true));
  slides.push(slide3);
  sliderContainer.appendChild(slide3);

  // Четвертый слайд (6 блок)
  const slide4 = document.createElement('div');
  slide4.classList.add('slide-item');
  slide4.appendChild(stagesBlockItems[5].cloneNode(true));
  slides.push(slide4);
  sliderContainer.appendChild(slide4);

  // Пятый слайд (7 блок)
  const slide5 = document.createElement('div');
  slide5.classList.add('slide-item');
  slide5.appendChild(stagesBlockItems[6].cloneNode(true));
  slides.push(slide5);
  sliderContainer.appendChild(slide5);

 // Добавляем контейнер слайдера и контейнер кнопок на страницу
 stagesBlockContainer.innerHTML = '';
 stagesBlockContainer.appendChild(sliderContainer);
 stagesBlockContainer.appendChild(buttonContainer);

 let currentSlide = 0;
 let isAnimating = false;

 // Обработчики событий для перелистывания слайдов
 const prevButton = document.createElement('button');
 prevButton.innerHTML = '<img src="images/icon/arrow-left.svg" alt="arrow">';
 prevButton.addEventListener('click', () => {
   if (!isAnimating) {
     goToSlide(currentSlide - 1);
   }
 });

 const nextButton = document.createElement('button');
 nextButton.innerHTML = '<img src="images/icon/arrow-right.svg" alt="arrow">';
 nextButton.addEventListener('click', () => {
   if (!isAnimating) {
     goToSlide(currentSlide + 1);
   }
 });

 // Создаем контейнер для точек
  const dotsContainer = document.createElement('div');
  dotsContainer.classList.add('slider-dots');

  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(dotsContainer); // Добавляем контейнер для точек
  buttonContainer.appendChild(nextButton);

  // Добавляем кнопки в контейнер кнопок
  buttonContainer.appendChild(prevButton);
  buttonContainer.appendChild(nextButton);

  function createDots() {
    dotsContainer.innerHTML = ''; // Очищаем контейнер перед созданием новых точек

    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('span');
      dot.classList.add('slider-dot');
      dot.addEventListener('click', () => {
        goToSlide(i); // Переключаемся на слайд при клике на точку
      });
      dotsContainer.appendChild(dot);
    }

    updateDots(); // Добавляем активный класс для текущей точки
  }
  function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
      if (index === currentSlide) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });
  }
  createDots(); // Создаем точки


  function goToSlide(slideIndex) {
    if (isAnimating) return;
    isAnimating = true;
  
    const newSlide = Math.max(0, Math.min(slideIndex, slides.length - 1));
    updateSlider(newSlide);
  
    // Обновление состояния кнопок
    if (newSlide === 0) {
      prevButton.classList.add('disabled');
    } else {
      prevButton.classList.remove('disabled');
    }
  
    if (newSlide === slides.length - 1) {
      nextButton.classList.add('disabled');
    } else {
      nextButton.classList.remove('disabled');
    }
  
    currentSlide = newSlide;
    setTimeout(() => {
      isAnimating = false;
    }, 500); // Задержка для плавной анимации (500 мс)
  }

  function updateSlider(newSlide) {
    slides.forEach((slide, index) => {
      slide.classList.remove('slide-active', 'slide-next', 'slide-prev');

      if (index === newSlide) {
        slide.classList.add('slide-active');
      } else if (index === currentSlide) {
        slide.classList.add('slide-prev');
      } else {
        slide.classList.add('slide-next');
      }
    });

    updateDots(); // Обновляем активную точку
  }

  updateSlider(currentSlide);
}

// Проверяем ширину экрана при загрузке страницы
window.addEventListener('load', () => {
  if (window.innerWidth <= 767) {
    mobileSlider();
  }
});


//--------------------- Слайдер "Участники" ----------------------
(function slider2() {
  const sliderContainer = document.querySelector('.slider-block__container');
  const slidesItem = document.querySelectorAll('.slider-block__item');
  const prevBtn = document.querySelector('.slider-block__btn_prev');
  const nextBtn = document.querySelector('.slider-block__btn_next');
  const currentSlideElement = document.querySelector('.current-slide');
  const totalSlidesElement = document.querySelector('.total-slides');

  let currentIndex = 0;
  const slideWidth = slidesItem[0].offsetWidth;
  const numSlides = slidesItem.length;

  // Функция для обновления дотсов
  function updateDots() {
    currentSlideElement.textContent = currentIndex + 1;
    totalSlidesElement.textContent = numSlides;
  }

  // Функция для перехода к следующему слайду
  function nextSlide() {
    currentIndex = (currentIndex + 1) % numSlides;
    sliderContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  // Функция для перехода к предыдущему слайду
  function prevSlide() {
    currentIndex = (currentIndex - 1 + numSlides) % numSlides;
    sliderContainer.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    updateDots();
  }

  // Функция для автопролистывания
  let autoSlideInterval;

  function autoSlide() {
    autoSlideInterval = setInterval(nextSlide, 3000); // Задайте необходимый интервал в миллисекундах
  }

  // Обработчики событий для кнопок
  nextBtn.addEventListener('click', nextSlide);
  prevBtn.addEventListener('click', prevSlide);

  // Обновляем дотсы при загрузке страницы
  updateDots();

  // Запускаем автопролистывание
  autoSlide();
})();







