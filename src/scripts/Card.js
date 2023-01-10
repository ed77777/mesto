import PopupWithImage from "./PopupWithImage.js";

const popupImage = document.querySelector(".popup-image");
const popupImgImage = document.querySelector(".popup-image__image");
const popupImgDescription = document.querySelector(".popup-image__description");

export class Card {
  constructor(name, path, classSelector, handleCardClick) {
    this.name = name;
    this.path = path;
    this.classSelector = classSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    // return document.querySelector(this.classSelector).content.cloneNode(true);
    return document.querySelector(this.classSelector).content.querySelector('.element').cloneNode(true);
  }

  _handleCardDelete() {
    this._element.remove();
  }

  // _handleOpenPopup() {
    // new PopupWithImage(this.path,this.name,'.popup-image').open();
  // }

  _handleClickHeart() {
    this._buttonLike.classList.toggle("element__heart_active");
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick()
    });

    this._element
      .querySelector(".element__trash-can")
      .addEventListener("click", () => {
        this._handleCardDelete();
      });


    this._buttonLike.addEventListener("click", () => {
      this._handleClickHeart();
    });
  }

  createCard() {
    // клонируем содержимое тега template
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".element__heart");
    // this._setEventListeners();

    this._cardImage = this._element.querySelector(".element__img");

    this._setEventListeners();

    // наполняем содержимым
    
    this._cardImage.src = this.path;
    this._cardImage.alt = this.name;
    this._element.querySelector(".element__paragraph").textContent = this.name;

    return this._element;
  }
}
