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
  inputCardTitle,
  inputCardDescription,
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
  popupProfile.setInputValues(userinfo2.name, userinfo2.info);
  popupProfile.open();
  mapForms.get("popupProfile").resetValidation();
}

function openPopupCard() {
  popupNewCard.open();
  mapForms.get("popupCard").resetValidation();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const answer = popupProfile.getInputValues();
  userInfo.setUserInfo(answer.get("UserName"), answer.get("Description"));
  // clearError(evt.target);
  this.close();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  section._renderer(
    createCard({ path: inputCardTitle.value, name: inputCardDescription.value })
  );
  this.close();
}

buttonAddElement.addEventListener("click", openPopupCard);
buttonEdit.addEventListener("click", openPopupProfile);

const buttonsClose = document.querySelectorAll(".popup__close-icon");

buttonsClose.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === button || evt.target === popup) {
      // closePopup(popup);
    }
  });
});

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
  // new PopupWithImage(this.path, this.name, ".popup-image").open();
  popupImage.setDate(this.path, this.name);
  popupImage.open();
}

function createCard(item) {
  return new Card(item.name, item.path, "#card", handleCardClick).createCard();
}

// const defaultCardList = new Section(
//   {
//     data: cards,
//     renderer: (item) => {
//       defaultCardList.addItem(createCard(item));
//     },
//   },
//   ".elements"
// );

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
