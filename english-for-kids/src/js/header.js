export class MenuCategory {
  constructor({ category }) {
    this.category = category;
  }

  createMenuCategory() {
    let template = '';
    const category = document.createElement('li');
    template += `
      <a href="#" class="menu-link">
        ${this.category}
      </a>`;

    category.innerHTML = template;
    return category;
  }
}

// mode-switch


export const addHamburgerClickHandler = () => {
  document.addEventListener('click', (e) => {
    const val = [...e.target.classList];
    const menu = document.querySelector('.header__navigation');
    const navbar = document.querySelector('.navbar');

    val.forEach((item) => {
      if (
        item === 'hamburger'
        || item === 'hamburger__line'
        || item === 'overlay'
        || item === 'close-ico'
        || (item === 'menu-link' && menu.classList.contains('hamburger__menu_open'))
      ) {
        menu.classList.toggle('hamburger__menu_open');

        document
          .getElementById('hamburger-menu-overlay')
          .classList.toggle('overlay');

        if (menu.classList.contains('hamburger__menu_open')) {
          navbar.style.marginRight = '150px';
        } else {
          navbar.style.marginRight = '';
        }
      }
    });
  });
};
