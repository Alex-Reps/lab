document.querySelectorAll(".faq-question").forEach((question) => {
    question.addEventListener("click", () => {
      const answer = question.nextElementSibling;
      answer.style.display = answer.style.display === "block" ? "none" : "block";
      question.querySelector("span").textContent = 
        answer.style.display === "block" ? "-" : "+";
    });
  });

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
    /*if (!(length(result) > 30)) {*/document.getElementById("form-status").textContent = result;//}
  });

  document.addEventListener('DOMContentLoaded', () => {
    fetch('/instructors')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('instructors-container');
            data.forEach(instructor => {
                const instructorDiv = document.createElement('div');
                instructorDiv.className = 'instructor';
                instructorDiv.innerHTML = `
                    <h3>${instructor.name}</h3>
                    <p>Опыт: ${instructor.experience} лет</p>
                    <p>Машина: ${instructor.car_model}</p>
                `;
                container.appendChild(instructorDiv);
            });
        })
        .catch(error => console.error('Ошибка загрузки данных об инструкторах:', error));
});

document.querySelector('.menu-toggle').addEventListener('click', function () {
  this.classList.toggle('active');
  document.querySelector('.menu-items').classList.toggle('active');
});

document.querySelector('.menu-items').classList.remove('active');


/*document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuItems = document.querySelector('.menu-items');
  const menuClose = document.querySelector('.menu-close');

  // Управление сужением header при прокрутке
  window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      if (scrollTop > 50) {
          header.classList.add('shrink');
      } else {
          header.classList.remove('shrink');
      }
  });

  // Открытие мобильного меню
  menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      menuItems.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
  });

  // Закрытие мобильного меню
  menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      menuItems.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', (e) => {
      if (!menuItems.contains(e.target) && !menuToggle.contains(e.target)) {
          menuItems.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
      }
  });
});*/

// JavaScript для управления поведением header и мобильного меню

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('header');
  const menuToggle = document.querySelector('.menu-toggle');
  const menuItems = document.querySelector('.menu-items');
  const menuClose = document.querySelector('.menu-close');
  const menuLinks = document.querySelectorAll('.menu-items a');


  // Открытие мобильного меню
  menuToggle.addEventListener('click', (e) => {
      e.preventDefault();
      menuItems.classList.add('active');
      menuToggle.setAttribute('aria-expanded', 'true');
  });

  // Закрытие мобильного меню
  menuClose.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('.menu-items').classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
  });

  // Закрытие меню при клике по ссылкам
  menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          document.querySelector('.menu-items').classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
      });
  });

  // Закрытие меню при клике вне его области
  document.addEventListener('click', (e) => {
      if (!menuItems.contains(e.target) && !menuToggle.contains(e.target)) {
          document.querySelector('.menu-items').classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
          document.querySelector('.menu-items').classList.remove('active');
      }
  });

  // Плавная прокрутка к якорям
  menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - header.offsetHeight,
                  behavior: 'smooth'
              });
          }
      });
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const menuClose = document.querySelector('.menu-close');
const menuItems = document.querySelector('.menu-items');

menuToggle.addEventListener('click', () => {
    menuItems.style.display = 'block';
});

menuClose.addEventListener('click', () => {
    menuItems.style.display = 'none';
});

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

// Находим все ссылки в мобильном меню
const menuLinks = document.querySelectorAll('.mobile-menu .menu-items a');

// Находим контейнер мобильного меню
const menuItemss = document.querySelector('.mobile-menu .menu-items');

// Функция для закрытия мобильного меню
function closeMenu() {
  menuItemss.style.display = 'none'; // Прячем меню
}

// Добавляем обработчик на все ссылки в мобильном меню
menuLinks.forEach(link => {
  link.addEventListener('click', closeMenu); // Закрыть меню при клике на ссылку
});

// Если есть кнопка для открытия меню, добавим обработчик для её активации
const menuToggles = document.querySelector('.mobile-menu .menu-toggle');

menuToggles.addEventListener('click', function() {
  menuItems.style.display = (menuItems.style.display === 'flex') ? 'none' : 'flex'; // Переключаем состояние меню
});

