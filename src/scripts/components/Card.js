// import { userInfo } from "../../pages/index.js";
// import { api } from "./index.js";

export class Card {
  constructor(
    name,
    path,
    classSelector,
    handleCardClick,
    item,
    // popupConfirmation,
    handleDeleteCard,
    handleLikeCard
  ) {
    // console.log(1);
    this.name = name;
    this.path = path;
    this.classSelector = classSelector;
    this._handleCardClick = handleCardClick;
    this.item = item;
    // this._id = item._id;
    // this._popupConfirmation = popupConfirmation;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
  }

  _getTemplate() {
    return document
      .querySelector(this.classSelector)
      .content.querySelector(".element")
      .cloneNode(true);
  }

  deleteElementCard() {
    this._element.remove();
    this._element = null;
  }

  test() {
    console.log("1");
  }

  toggleLikes() {
    this._buttonLike.classList.toggle("element__heart_active");
  }

  // _handleCardDelete() {
  // a = document.querySelector('.popup-confirmation');
  // this._popupConfirmation.cardId = this.item._id;
  // this._popupConfirmation.element = this._element;
  // this._popupConfirmation.open();
  // this._popupConfirmation._handleDeleteCard = (()=>this._handleDeleteCard(this.item._id))
  // this._handleDeleteCard(this.item._id);
  // this._element.remove();
  // this._element = null;
  // }

  // _handleClickHeart() {
  //   this._buttonLike.classList.toggle("element__heart_active");

  //   let methodName;

  //   if (this._buttonLike.classList.contains("element__heart_active")) {
  //     // api.setLike("cards/" + this.item._id + "/likes").then((res) => {
  //     //   this._counterLikes.textContent = res.likes.length;
  //     // });
  //     methodName = "PUT";
  //   } else {
  //     // api.setDeleteLike("cards/" + this.item._id + "/likes",).then((res) => {
  //     //   this._counterLikes.textContent = res.likes.length;
  //     // });
  //     methodName = "DELETE";
  //   }

  //   api
  //     .setDeleteLike("cards/" + this.item._id + "/likes", methodName)
  //     .then((res) => {
  //       this._counterLikes.textContent = res.likes.length;
  //     });
  // }

  updateLikes(likes) {
    this._counterLikes.textContent = likes;
  }

  _setEventListeners() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick();
    });

    this._buttonTrash.addEventListener("click", () => {
      // this._handleCardDelete();
      this._handleDeleteCard();
    });

    this._buttonLike.addEventListener("click", () => {
      // this._handleClickHeart();
      this._handleLikeCard();
    });
  }

  createCard(userId) {

    // console.log(userId);

    // клонируем содержимое тега template
    this._element = this._getTemplate();
    this._buttonLike = this._element.querySelector(".element__heart");
    this._buttonTrash = this._element.querySelector(".element__trash-can");
    // this._setEventListeners();

    this._cardImage = this._element.querySelector(".element__img");
    this._counterLikes = this._element.querySelector(".element__counter-likes");

    this._setEventListeners();

    // наполняем содержимым

    this._cardImage.src = this.path;
    this._cardImage.alt = this.name;
    this._counterLikes.textContent = this.item.likes.length;
    this.item.likes.forEach((element) => {
      if ((element._id == userId)) {
        this._buttonLike.classList.add("element__heart_active");
      }
    });
    if (this.item.owner._id != userId) {
      this._buttonTrash.classList.add("element__trash-can-invisible");
    }
    this._element.querySelector(".element__paragraph").textContent = this.name;

    return this._element;
  }
}
