export class CategoryCard {
  constructor({ category, image }) {
    this.category = category;
    this.image = image;
  }

  // Category generator
  generateCategory() {
    let template = '';
    const category = document.createElement('a');
    category.className = 'card card-category';
    category.setAttribute('data-category', this.category);

    if (this.category) {
      template += `
      <div class="category-header">${this.category}</div>
      `;
    }

    this.image &&
      (template += `
        <div class="category-img">
          <img src=${this.image} alt='${this.category}'>
        </div>
      `);

    category.innerHTML = template;
    return category;
  }
}
