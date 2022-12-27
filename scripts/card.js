// import { openPopup } from "./index.js";

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
    // return document.querySelector(this.classSelector).content.cloneNode(true);
    return document.querySelector(this.classSelector).content.querySelector('.element').cloneNode(true);
  }

  _handleCardDelete() {
    this._element.remove();
  }

  _handleOpenPopup() {
    popupImgImage.src = this.path;
    popupImgImage.alt = this.name;
    popupImgDescription.textContent = this.name;
    // openPopup(popupImage);
  }

  _handleClickHeart() {
    this._buttonLike.classList.toggle("element__heart_active");
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleOpenPopup();
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
