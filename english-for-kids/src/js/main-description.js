export const createMainDescription = () => {
  const descriptionContainer = document.querySelector('#content');
  const description = document.createElement('div');
  description.className = 'main-description';
  description.id = 'main';

  description.innerHTML += `
  <p>English for kids - приложение для изучения английских слов детьми, построенное на игровой механике.</p>
  <p>Структура приложения:<br>
  1. Страница с категориями<br>
  2. Страница с карточками категорий<br>
  3. Страница статистики (в разработке)<br>
  4. Справка</p>
  <p>Приложение работает в режиме тренировки и в режиме игры. Переключение между тренировкой и игрой происходит при клике по переключателю Train/Play.</p>
  `;
  descriptionContainer.append(description);
  return descriptionContainer;
};
