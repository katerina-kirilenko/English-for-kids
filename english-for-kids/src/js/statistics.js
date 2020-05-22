export const createStatistics = () => {
  const statisticsContainer = document.querySelector('#content');
  const statistics = document.createElement('div');
  statistics.className = 'statistics-wrapper';
  statistics.id = 'statistics';

  statistics.innerHTML += `<p>Страница статистики находится в разработке :)</p>`;
  statisticsContainer.append(statistics);
  return statisticsContainer;
};
