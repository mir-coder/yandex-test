// ------------------ Слайдер "Этапы"-------------------------
document.addEventListener('DOMContentLoaded', () => {
  // Проверяем начальное разрешение
  function initSlider() {
    if (window.innerWidth <= 767) {
      const items = document.querySelectorAll('.stages-block__item');
      const totalSlides = 5; // У нас фиксированное количество слайдов
      let currentSlide = 0;
      const autoPlayInterval = 7000; // Интервал автопроигрывания в миллисекундах

      // Создаем обертки для групповых элементов
      const wrapperGroup1 = document.createElement('div');
      wrapperGroup1.classList.add('stages-block__item', 'stages-block__item-wrapper');
      const wrapperGroup2 = document.createElement('div');
      wrapperGroup2.classList.add('stages-block__item', 'stages-block__item-wrapper');

      // Оборачиваем элементы в новые контейнеры
      items[0].parentNode.insertBefore(wrapperGroup1, items[0]);
      wrapperGroup1.append(items[0], items[1]); // Добавляем 1 и 2 блок в первый контейнер

      items[3].parentNode.insertBefore(wrapperGroup2, items[3]);
      wrapperGroup2.append(items[3], items[4]); // Добавляем 4 и 5 блок в второй контейнер

      // Создаем точки
      const dotsContainer = document.getElementById('dots-container');
      for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        dot.dataset.index = i;
        dotsContainer.appendChild(dot);

        // Обработчик клика по точке
        dot.addEventListener('click', () => {
          currentSlide = i; // Ставим текущий слайд на индекс точки
          showSlide(currentSlide);
        });
      }

      // Функция для показа текущего слайда
      function showSlide(slideIndex) {
        // Убираем активные классы
        items.forEach(item => item.classList.remove('active')); // Убираем активные классы
        wrapperGroup1.classList.remove('active');
        wrapperGroup2.classList.remove('active');

        document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active')); // Убираем активные классы у точек

        // Определяем, какой элемент показывать в зависимости от текущего слайда
        switch (slideIndex) {
          case 0:
            wrapperGroup1.classList.add('active'); // показываем группу 1
            break;
          case 1:
            items[2].classList.add('active'); // показываем 3-й блок
            break;
          case 2:
            wrapperGroup2.classList.add('active'); // показываем группу 2
            break;
          case 3:
            items[5].classList.add('active'); // показываем 6-й блок
            break;
          case 4:
            items[6].classList.add('active'); // показываем 7-й блок
            break;
        }

        // Обновляем активные точки
        document.querySelectorAll('.dot').forEach((dot, index) => {
          dot.classList.toggle('active', index === slideIndex);
        });
      }

      // Получаем все элементы с классом stages-block__item-wrapper
      const wrappers = document.querySelectorAll('.stages-block__item-wrapper');

      // Проходим по каждому обертке и удаляем класс stages-block__item у его дочерних элементов
      wrappers.forEach(wrapper => {
        const itemsInside = wrapper.querySelectorAll('.stages-block__item');
        itemsInside.forEach(item => {
          item.classList.remove('stages-block__item');
        });
      });

      // Показать первый слайд
      showSlide(currentSlide);

      // Автопроигрывание
      let autoPlay = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides; // Переходим к следующему слайду
        showSlide(currentSlide);
      }, autoPlayInterval);

      // Обработка нажатия на кнопку "Следующий"
      document.getElementById('nextBtn').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides; // Переходим к следующему слайду
        showSlide(currentSlide);
      });

      // Очистка интервала при отключении слайдера
      window.addEventListener('resize', () => {
        if (window.innerWidth > 767) {
          clearInterval(autoPlay); // Остановить автопроигрывание если ширина больше 767
          // Здесь можете добавить дополнительную логику для очистки слайдера, если необходимо
        }
      });
    }
  }

  initSlider(); // Инициализируем слайдер

  // Проверка при изменении размера окна
  window.addEventListener('resize', initSlider);
});


