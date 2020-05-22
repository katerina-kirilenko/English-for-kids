export class Card {
  constructor({ word, translation, image, audioSrc }) {
    this.word = word;
    this.translation = translation;
    this.image = image;
    this.audioSrc = audioSrc;
  }

  // Card generator
  generateCard() {
    const card = document.createElement('div');
    card.className = 'card';
    let template = document.createDocumentFragment();

    const cardFront = document.createElement('div');
    cardFront.className = 'card-face front';
    cardFront.setAttribute('data-card', this.word);
    cardFront.setAttribute('sound', this.audioSrc);
    cardFront.innerHTML += `
      <div class="card-img">
        <img src=${this.image} alt='${this.word}'></div>`;
    cardFront.innerHTML += `
      <div class="card-header">${this.word}</div>`;
    template.append(cardFront);

    const cardBack = document.createElement('div');
    cardBack.className = 'card-face back';
    cardBack.setAttribute('data-card', this.translation);
    cardBack.innerHTML += `
    <div class="card-img">
      <img src=${this.image} alt='${this.translation}'></div>`;
    cardBack.innerHTML += `
      <div class="card-header">${this.translation}</div>`;
    template.append(cardBack);

    const rotate = document.createElement('div');
    rotate.className = 'rotate';
    template.append(rotate);

    card.append(template);
    return card;
  }
}
