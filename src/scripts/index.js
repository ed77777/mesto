import '../page/index.css'; // добавьте импорт главного файла стилей


import { Section } from "./Section.js";
import { cards } from "./date.js";
import { Card } from "./Card.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import { FormValidator, objectValidation } from "./FormValidator.js";

const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");

const buttonCardSubmit = document.querySelector(".popup-card__button-save");

const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAddElement = document.querySelector(".profile__button-add");
export const profileTitleElem = document.querySelector(".profile__title");
export const profileDescriptionElem = document.querySelector(".profile__description");
export const inputUserNameElem = document.querySelector(
  ".popup-profile__input_input_title"
);
export const inputDescriptionElem = document.querySelector(
  ".popup-profile__input_input_description"
);

const inputCardTitle = document.querySelector(".popup-card__input_input_title");
const inputCardDescription = document.querySelector(
  ".popup-card__input_input_description"
);

const popupProfileForm = document.forms["popup-profile__form"];
const popupCardForm = document.forms["popup-card__form"];

const cardsContainer = document.querySelector(".elements");

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();
//   profileTitleElem.textContent = inputUserNameElem.value;
//   profileDescriptionElem.textContent = inputDescriptionElem.value;
//   closePopup(popupProfile);
//   clearError(evt.target);
// }

// function handleCardFormSubmit(evt) {
//   evt.preventDefault();
//   addCard(
//     new Card(
//       inputCardTitle.value,
//       inputCardDescription.value,
//       "#card"
//     ).createCard(),
//     "start"
//   );
//   evt.target.reset();
//   closePopup(popupCard);
//   clearError(evt.target);
// }

function openPopupCard() {
  new PopupWithForm('','',".popup-card",'popup-card__form',handleCardFormSubmit).open();
  mapForms.get("popupCard").resetValidation();
}

function openPopupProfile() {
  new PopupWithForm(profileTitleElem.innerText,profileDescriptionElem.innerText,".popup-profile", 'popup-profile__form', handleProfileFormSubmit).open();
  mapForms.get("popupProfile").resetValidation();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElem.textContent = inputUserNameElem.value;
  profileDescriptionElem.textContent = inputDescriptionElem.value;
  // clearError(evt.target);
   this.close();
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  new Section(
    {
      data: [{path: inputCardTitle.value, name: inputCardDescription.value}],
      renderer: (item) => {
        const cardElement = new Card(item.path, item.name, "#card", handleCardClick).createCard();
        defaultCardList.addItem(cardElement);
      },
    },
    ".elements"
  ).renderItems();
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

function handleCardClick(){
  new PopupWithImage(this.path,this.name,'.popup-image').open();
}

const defaultCardList = new Section(
  {
    data: cards,
    renderer: (item) => {
      const cardElement = new Card(item.name, item.path, "#card", handleCardClick).createCard();
      defaultCardList.addItem(cardElement);
    },
  },
  ".elements"
);

defaultCardList.renderItems();
