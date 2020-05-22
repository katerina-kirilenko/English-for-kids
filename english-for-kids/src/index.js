import Data from './js/data';
import { addHamburgerClickHandler, MenuCategory } from './js/header';
import { createMainDescription } from './js/main-description';
import { CategoryCard } from './js/category';
import { Card } from './js/card';
import { createStatistics } from './js/statistics';
import { createSwitch } from './js/switch';

window.onload = function () {
  addHamburgerClickHandler();
  renderMenuCategories();
  addMenuClickHandler();
  renderPages();
  renderSwith();
};

const pages = {
  main: 'Справка',
  categories: 'Категории',
  actionA: 'Действия (набор А)',
  actionB: 'Действия (набор Б)',
  animalA: 'Животные (набор А)',
  animalB: 'Животные (набор Б)',
  clothes: 'Одежда',
  emotions: 'Эмоции',
  colors: 'Цвета',
  numbers: 'Цифры',
  statistics: 'Статистика',
};

const state = {
  page: pages.categories,
  currentCard: 0,
  play: false,
  playActive: false,
  randomArr: [],
  errors: 0,
  endGame: false,
};

// обработка стэйта
const saveState = () => {
  localStorage.setItem('page', state.page);
};

const restoreState = () => {
  state.page = localStorage.getItem('page')
    ? localStorage.getItem('page')
    : pages.categories;
};

// создание категорий в меню
const renderMenuCategories = () => {
  const menuContainer = document.querySelector('#category');
  generateMenuCategories(Data).forEach((category) => {
    menuContainer.append(category.createMenuCategory());
  });
  return menuContainer;
};

const generateMenuCategories = (Data) => {
  let categoryLink = [];
  Data.forEach((category) => {
    categoryLink.push(new MenuCategory(category));
  });
  return categoryLink;
};

// рендер "страниц"
const renderPages = () => {
  restoreState();
  switch (state.page) {
    case pages.statistics:
      renderStatistics();
      break;
    case pages.main:
      renderMainDescription();
      break;
    case pages.actionA:
    case pages.actionB:
    case pages.animalA:
    case pages.animalB:
    case pages.clothes:
    case pages.emotions:
    case pages.colors:
    case pages.numbers:
      renderCardsToDom();
      break;
    default:
      renderCategoriesToDom();
      break;
  }
};

const addMenuClickHandler = () => {
  document.getElementById('menu').addEventListener('click', (event) => {
    for (const key in pages) {
      if (event.target.innerText == pages[key]) {
        state.page = pages[key];
        saveState();
        renderPages();
      }
    }
    const categoryHeaderArr = document.querySelectorAll('.category-header');
    if (state.play) {
      if (state.page == pages.categories) {
        categoryHeaderArr.forEach((categoryHeader) => {
          categoryHeader.classList.add('play');
          categoryHeader.classList.remove('train');
        });
      }
      if (
        state.page !== pages.categories &&
        state.page !== pages.main &&
        state.page !== pages.statistics
      ) {
        createInterfaceGame();
      }
    } else {
      categoryHeaderArr.forEach((categoryHeader) => {
        categoryHeader.classList.add('train');
        categoryHeader.classList.remove('play');
      });

      removeInterfaceGame();
    }
  });
};

// изменение тайтла в хэдере
const changeHeaderTitle = () => {
  const headerTitle = document.querySelector('.header-title');
  headerTitle.innerText = `${state.page}`;
};

// рендер страницы с описанием (главная)
const renderMainDescription = () => {
  document.querySelector('#content').innerHTML = '';
  createMainDescription();
  changeHeaderTitle();
};

// рендер страницы с категориями
const renderCategoriesToDom = () => {
  const categoriesWrapper = getCategoriesWrapper();
  generateCategories(Data).forEach((category) => {
    categoriesWrapper.append(category.generateCategory());
  });
  changeHeaderTitle();
  addCategoryClickHandler();
};

const getCategoriesWrapper = () => {
  let categoriesContainer = document.querySelector('#content');
  categoriesContainer.innerHTML = '';

  const categories = document.createElement('div');
  categories.className = 'categories-wrapper';
  categories.id = 'categories';
  categoriesContainer.append(categories);

  categoriesContainer = document.querySelector('#categories');
  return categoriesContainer;
};

const generateCategories = (Data) => {
  let categories = [];
  Data.forEach((category) => {
    categories.push(new CategoryCard(category));
  });
  return categories;
};

const addCategoryClickHandler = () => {
  document.querySelector('#categories').addEventListener('click', (event) => {
    if (event.target.closest('.card')) {
      let clickedCategory = event.target
        .closest('.card')
        .getAttribute('data-category');
      let clickedCategoryData = getClickedData(clickedCategory);
      state.page = clickedCategoryData.category;
      saveState();
      renderPages();
    }
  });
};

const getClickedData = (data) => {
  return Data.find((category) => category.category === data);
};

const renderCardsToDom = () => {
  const cardsWrapper = getCardsWrapper();

  let getClickedData;
  for (const category in Data) {
    if (Data[category].category === state.page) {
      getClickedData = Data[category];
    }
  }

  generateCards(getClickedData.cards).forEach((card) => {
    cardsWrapper.append(card.generateCard());
  });
  changeHeaderTitle();
  addCardClickHandler();
  addCardMouseOutHandler();
};

const getCardsWrapper = () => {
  let cardsContainer = document.querySelector('#content');
  cardsContainer.innerHTML = '';

  const cards = document.createElement('div');
  cards.className = 'cards-wrapper';
  cards.id = 'cards';
  cardsContainer.append(cards);

  cardsContainer = document.querySelector('#cards');
  return cardsContainer;
};

const generateCards = (arrCards) => {
  let cards = [];
  arrCards.forEach((card) => {
    cards.push(new Card(card));
  });
  return cards;
};

const addCardClickHandler = () => {
  const cards = document.querySelector('#cards');

  cards.addEventListener('click', (event) => {
    const clickedCard = event.target.closest('.card');
    const clickedRotate = event.target.closest('.rotate');
    const clickedFront = event.target.closest('.front');

    if (clickedRotate) {
      clickedCard.classList.add('is-flipped');
    }

    function addSoundCard() {
      let audio = new Audio();
      audio.src = clickedFront ? clickedFront.getAttribute('sound') : '';
      audio.autoplay = true;
    }

    if (clickedCard && !state.play) addSoundCard();
  });
};

const addCardMouseOutHandler = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => {
    card.addEventListener('mouseleave', (event) => {
      card.classList.remove('is-flipped');
    });
  });
};

// рендер страницы статистики
const renderStatistics = () => {
  document.querySelector('#content').innerHTML = '';
  createStatistics();
  changeHeaderTitle();
};

const renderSwith = () => {
  createSwitch();
  document.querySelector('.mode-switch-train').innerText = 'Train';
  addClickSwitchHandler();
};

const addClickSwitchHandler = () => {
  const labelTrain = document.querySelector('.mode-switch-train');
  const labelPlay = document.querySelector('.mode-switch-play');
  const headerNav = document.querySelector('.header__navigation');
  const categoryHeaderArr = document.querySelectorAll('.category-header');

  document
    .getElementById('id-mode-switch')
    .addEventListener('click', (event) => {
      if (!state.play) {
        state.play = true;

        labelTrain.innerText = '';
        labelPlay.innerText = 'Play';

        headerNav.classList.add('play');
        headerNav.classList.remove('train');

        if (state.page == pages.categories) {
          categoryHeaderArr.forEach((categoryHeader) => {
            categoryHeader.classList.add('play');
            categoryHeader.classList.remove('train');
          });
        }
        if (
          state.page !== pages.categories &&
          state.page !== pages.main &&
          state.page !== pages.statistics
        ) {
          createInterfaceGame();
        }
      } else {
        state.play = false;

        labelTrain.innerText = 'Train';
        labelPlay.innerText = '';

        headerNav.classList.add('train');
        headerNav.classList.remove('play');

        if (state.page == pages.categories) {
          categoryHeaderArr.forEach((categoryHeader) => {
            categoryHeader.classList.add('train');
            categoryHeader.classList.remove('play');
          });
        }
        if (
          state.page !== pages.categories &&
          state.page !== pages.main &&
          state.page !== pages.statistics
        ) {
          removeInterfaceGame();
        }
      }
    });
};

const removeInterfaceGame = () => {
  const isWrapGame = document.querySelector('.wrap-game');
  if (isWrapGame) {
    isWrapGame.remove();

    document.querySelector('#cards').style.paddingTop = '160px';
    const cardHeaderArr = document.querySelectorAll('.card-header');
    cardHeaderArr.forEach((cardHeader) => {
      cardHeader.classList.remove('none');
    });

    const rotateItemArr = document.querySelectorAll('.rotate');
    rotateItemArr.forEach((rotateItem) => {
      rotateItem.classList.remove('none');
    });
  }
};

const createInterfaceGame = () => {
  const wrapGame = document.createElement('div');
  wrapGame.className = 'wrap-game';
  document.querySelector('#content').prepend(wrapGame);

  const btnGame = document.createElement('a');
  btnGame.className = 'btn-game';
  btnGame.innerText = 'Start game';

  document.querySelector('.wrap-game').prepend(btnGame);

  const isWrapGame = document.querySelector('.wrap-game');
  if (isWrapGame) {
    document.querySelector('#cards').style.paddingTop = '8px';

    const cardHeaderArr = document.querySelectorAll('.card-header');
    cardHeaderArr.forEach((cardHeader) => {
      cardHeader.classList.add('none');
    });

    const rotateItemArr = document.querySelectorAll('.rotate');
    rotateItemArr.forEach((rotateItem) => {
      rotateItem.classList.add('none');
    });
  }

  initGame();
};

const initGame = () => {
  const rating = document.createElement('div');
  rating.className = 'rating';

  const randomArr = document.querySelectorAll('.card .front');
  state.randomArr = [...randomArr];

  function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }

  shuffle(state.randomArr);

  const createSoundCard = (currentCard) => {
    let audio = new Audio();
    audio.src = state.randomArr[currentCard].getAttribute('sound');
    audio.autoplay = true;
  };

  const btnGame = document.querySelector('.btn-game');
  btnGame.addEventListener('click', (event) => {
    state.playActive = true;

    createSoundCard(state.currentCard);

    btnGame.innerText = '';
    btnGame.classList.add('repeat');

    document.querySelector('.wrap-game').append(rating);
  });

  document.querySelector('#cards').addEventListener('click', (event) => {
    const frontCard = event.target.closest('.front');
    const clickedCardSound = frontCard ? frontCard.getAttribute('sound') : '';

    if (state.playActive) {
      if (
        clickedCardSound ===
        state.randomArr[state.currentCard].getAttribute('sound')
      ) {
        state.currentCard += 1;
        rating.innerHTML += `<div class="star-succes"></div>`;
        let audio = new Audio();
        audio.src = './assets/audio/correct.mp3';
        audio.autoplay = true;

        if (state.currentCard == 8) {
          state.playActive = false;

          if (state.errors === 0) {
            let audio = new Audio();
            audio.src = './assets/audio/success.mp3';
            audio.autoplay = true;
            alert('Ты всё угадал!');
          } else {
            let audio = new Audio();
            audio.src = './assets/audio/failure.mp3';
            audio.autoplay = true;
            alert(`Количество ошибок: ${state.errors}`);
          }

          renderCategoriesToDom();
        } else {
          createSoundCard(state.currentCard);
        }
      } else {
        rating.innerHTML += `<div class="star-error"></div>`;
        let audio = new Audio();
        audio.src = './assets/audio/error.mp3';
        audio.autoplay = true;
        state.errors += 1;
      }
    }
  });
};
