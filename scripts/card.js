const popupImage = document.querySelector(".popup-image");
const popupImgImage = document.querySelector(".popup-image__image");
const popupImgDescription = document.querySelector(".popup-image__description");

export class Card {
  constructor(name, path, classSelector) {
    this.name = name;
    this.path = path;
    this.classSelector = classSelector;
  }

  _getTemplate() {
    return document.querySelector(this.classSelector).content.cloneNode(true);
  }

  _handleCardDelete(evt) {
    evt.target.closest(".element").remove();
  }

  _handleOpenPopup() {
    // console.log(1);
    popupImgImage.src = this.path;
    popupImgImage.alt = this.name;
    popupImgDescription.textContent = this.name;

    popupImage.src = this._image;
    popupImage.classList.add("popup_opened");
  }

  _setEventListeners() {
    const cardElementImage = this._element.querySelector(".element__img");
    cardElementImage.addEventListener('click', () => {
      this._handleOpenPopup();
    });

    this._element
    .querySelector(".element__trash-can")
    .addEventListener("click", this._handleCardDelete);
  //   .addEventListener("click", () => {
  //     cardElement.remove();
  // });  //попытка сделать через замыкание, не заработало, попробую сделать позже

  this._element
    .querySelector(".element__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__heart_active");
    });
  }

  createCard() {
    // клонируем содержимое тега template
    this._element = this._getTemplate();
    // this._setEventListeners();
    
    this._setEventListeners();

    // наполняем содержимым
    const cardElementImage = this._element.querySelector(".element__img");
    cardElementImage.src = this.path;
    cardElementImage.alt = this.name;
    this._element.querySelector(".element__paragraph").textContent = this.name;

    return this._element;
  }
}