
// Отправка заявки
document.getElementById("applicationForm").addEventListener("submit", async (event) => {
event.preventDefault();

const name = document.getElementById("name").value;
const group = document.getElementById("group").value;
const phone = document.getElementById("phone").value;

const response = await fetch("/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, group, phone }),
});

const result = await response.text();
document.getElementById("form-status").textContent = result;
});

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById("instructors-container");

    // Функция для получения данных об инструкторах
    async function fetchInstructors() {
        try {
            const response = await fetch('/instructors');
            if (!response.ok) {
                throw new Error('Ошибка при получении данных об инструкторах.');
            }
            const instructors = await response.json();

            // Формируем HTML для каждого инструктора
            container.innerHTML = instructors.map(instructor => `
                <div class="instructor-card">
                    <img src="${instructor.image}" alt="${instructor.car_model}" class="car-image">
                    <h3>${instructor.name}</h3>
                    <p>Опыт: ${instructor.experience} лет</p>
                    <p>Автомобиль: ${instructor.car_model}</p>
                </div>
            `).join('');
        } catch (error) {
            console.error('Ошибка:', error);
            container.innerHTML = '<p>Не удалось загрузить данные об инструкторах.</p>';
        }
    }

    // Вызываем функцию для получения данных
    fetchInstructors();
});

// JavaScript для управления поведением header и мобильного меню

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuItems = document.querySelector('.menu-items');
  const menuClose = document.querySelector('.menu-close');
  const menuLinks = document.querySelectorAll('.menu-items a');


  // Открытие мобильного меню
  menuToggle.addEventListener('click', (e) => {
    e.preventDefault()
    // Если меню закрыто, открываем его
    menuItems.style.display = 'block'
    menuToggle.setAttribute('aria-expanded', 'true'); // Обновляем атрибут aria
    menuToggle.style.display = 'none'; // Скрываем кнопку меню
    menuClose.style.display = 'block'; // Показываем кнопку закрытия
  });

  // Закрытие мобильного меню
  menuClose.addEventListener('click', (e) => {
    e.preventDefault();
    menuToggle.style.display = 'block'; // Показываем кнопку меню
    menuClose.style.display = 'none'; // Скрываем кнопку закрытия
    // Если меню открыто, закрываем его
    menuItems.style.display = 'none'
    menuToggle.setAttribute('aria-expanded', 'false'); // Обновляем атрибут aria
  });

  // Закрытие меню при клике по ссылкам
  menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        menuToggle.style.display = 'block'; // Показываем кнопку меню
        menuClose.style.display = 'none'; // Скрываем кнопку закрытия
        // Если меню открыто, закрываем его
        menuItems.style.display = 'none'
        menuToggle.setAttribute('aria-expanded', 'false'); // Обновляем атрибут aria
      });
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const menuItems = document.querySelector('.menu-items');

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
      e.preventDefault();

      const target = document.querySelector(this.getAttribute('href'));
      const headerOffset = 60; // Высота вашего фиксированного заголовка
      const elementPosition = target.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
      });
  });
});