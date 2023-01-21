import "../page/index.css"; // добавьте импорт главного файла стилей

import { Section } from "./Section.js";
import { cards } from "./date.js";
import { Card } from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { FormValidator, objectValidation } from "./FormValidator.js";
import UserInfo from "./UserInfo";

import {
  buttonEdit,
  buttonAddElement,
} from "./globalМariables.js";

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
  popupProfile.setInputValues({'popup__input-title': userinfo2.name, 'popup__input-description': userinfo2.info});
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
  // clearError(evt.target);
  this.close();
}

function handleCardFormSubmit(evt, answer) {
  evt.preventDefault();
  section._renderer({
    path: answer["popup-card__input-description"],
    name: answer["popup-card__input-title"],
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
  return new Card(item.name, item.path, "#card", handleCardClick).createCard();
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

section.renderItems();

const userInfo = new UserInfo({
  classSelectorName: ".profile__title",
  classSelectorInfo: ".profile__description",
});
