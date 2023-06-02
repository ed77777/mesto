import "../page/index.css"; // добавьте импорт главного файла стилей

import { Section } from "./Section.js";
import { cards } from "./date.js";
import { Card } from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupConfirmation from "./PopupConfirmation.js";
import { FormValidator, objectValidation } from "./FormValidator.js";
import UserInfo from "./UserInfo";

import { buttonEdit, buttonAddElement } from "./globalМariables.js";

import Api from "./Api.js";

const popupConfirmation = new PopupConfirmation(
  ".popup-confirmation",
  "popup-confirmation__form",
  handleConfirmationFormSubmit
);

function handleConfirmationFormSubmit(evt) {
  evt.preventDefault();
  api.deleteCard("cards", this.cardId);
  this.close();
}

const popupProfile = new PopupWithForm(
  ".popup-profile",
  "popup-profile__form",
  handleProfileFormSubmit
);

const popupNewCard = new PopupWithForm(
  ".popup-card",
  "popup-card__form",
  handleCardFormSubmit
);

const popupImage = new PopupWithImage(".popup-image");

function openPopupProfile() {
  const userinfo2 = userInfo.getUserInfo();
  // popupProfile.setInputValues(userinfo2.name, userinfo2.info);ы
  popupProfile.setInputValues({
    "popup__input-title": userinfo2.name,
    "popup__input-description": userinfo2.info,
  });
  popupProfile.open();
  mapForms.get("popupProfile").resetValidation();
}

function openPopupCard() {
  popupNewCard.open();
  mapForms.get("popupCard").resetValidation();
}

function handleProfileFormSubmit(evt, answer) {
  evt.preventDefault();
  userInfo.setUserInfo(
    answer["popup__input-title"],
    answer["popup__input-description"]
  );

  const promiseEditUserInfo = api.editDataProfile(
    "users/me",
    answer["popup__input-title"],
    answer["popup__input-description"]
  );

  promiseEditUserInfo
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
    });

  this.close();
}

function handleCardFormSubmit(evt, answer) {
  evt.preventDefault();
  api
    .AddNewCard(
      "cards",
      answer["popup-card__input-title"],
      answer["popup-card__input-description"]
    )
    .then((data) => {
      section._renderer({
        path: data.link,
        name: data.name,
      });
    });
  this.close();
}

buttonAddElement.addEventListener("click", openPopupCard);
buttonEdit.addEventListener("click", openPopupProfile);

const buttonsClose = document.querySelectorAll(".popup__close-icon");

const mapForms = new Map();

const formElems = document.querySelectorAll(objectValidation.formSelector);
formElems.forEach((formElem) => {
  const FormValidatorObject = new FormValidator(objectValidation, formElem);
  FormValidatorObject.enableValidation();
  FormValidatorObject.resetValidation();
  if (formElem.name == "popup-profile__form") {
    mapForms.set("popupProfile", FormValidatorObject);
  }
  if (formElem.name == "popup-card__form") {
    mapForms.set("popupCard", FormValidatorObject);
  }
});

function handleCardClick() {
  popupImage.setDate(this.path, this.name);
  popupImage.open();
}

function createCard(item) {
  return new Card(
    item.name,
    item.link,
    "#card",
    handleCardClick,
    item,
    popupConfirmation,
    handleDeleteCard
  ).createCard();
}

function handleDeleteCard(id) {
  api.deleteCard("cards/cardId", id);
}

const section = new Section(
  {
    data: cards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  ".elements"
);

export const api = new Api("https://mesto.nomoreparties.co/v1/cohort-66/", {
  // authorization: "bded0b96-741a-4aec-a12c-3032e1055b83",
  authorization: "79335ee4-3f4b-46aa-805e-b15476f4972e",
  "Content-Type": "application/json",
});

export const userInfo = new UserInfo({
  classSelectorName: ".profile__title",
  classSelectorInfo: ".profile__description",
  classSelectorImage: ".profile__image",
  classSelectorImageEdit: ".profile__conteiner",
  handleImageClick
});

api.getUserData("users/me").then((data) => {
  userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);

  api.getUserData("cards").then((data) => {
    section._renderedItems = data;
    section.renderItems();
  });
});

function handleImageClick() {
  const popupProfile = new PopupWithForm(
    ".popup-profile",
    "popup-profile__form",
    handleProfileFormSubmit
  );
  popupProfile.open();
}
