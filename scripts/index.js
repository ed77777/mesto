import { cards } from "./date.js";
import { Card } from "./Card.js";

const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");

const buttonCardSubmit = document.querySelector(".popup-card__button-save");

const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAddElement = document.querySelector(".profile__button-add");
const profileTitleElem = document.querySelector(".profile__title");
const profileDescriptionElem = document.querySelector(".profile__description");
const inputUserNameElem = document.querySelector(
  ".popup-profile__input_input_title"
);
const inputDescriptionElem = document.querySelector(
  ".popup-profile__input_input_description"
);

const inputCardTitle = document.querySelector(".popup-card__input_input_title");
const inputCardDescription = document.querySelector(
  ".popup-card__input_input_description"
);

const popupProfileForm = document.forms["popup-profile__form"];
const popupCardForm = document.forms["popup-card__form"];

const cardsContainer = document.querySelector(".elements");

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitleElem.textContent = inputUserNameElem.value;
  profileDescriptionElem.textContent = inputDescriptionElem.value;
  closePopup(popupProfile);
  clearError(evt.target);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  addCard(
    new Card(inputCardTitle.value, inputCardDescription.value, "#card").createCard(),
    "start"
  );
  evt.target.reset();
  closePopup(popupCard);
  clearError(evt.target);
}

export function openPopup(popupElem) {
  popupElem.classList.add("popup_opened");
  addEventListenerEsc();
}

function closePopup(popupElem) {
  popupElem.classList.remove("popup_opened");
  removeEventListenerEsc();
}

function handleCloseByEsc(evt) {
  if (evt.key === "Escape") {
    const popupElement = document.querySelector(`.popup_opened`);
    closePopup(popupElement);
  }
}

function addEventListenerEsc() {
  document.addEventListener("keydown", handleCloseByEsc);
}

function removeEventListenerEsc() {
  document.removeEventListener("keydown", handleCloseByEsc);
}

function openPopupCard() {
  openPopup(popupCard);
  mapForms.get("popupCard").resetValidation();
}

function openPopupProfile() {
  inputUserNameElem.value = profileTitleElem.innerText;
  inputDescriptionElem.value = profileDescriptionElem.innerText;
  openPopup(popupProfile);
  mapForms.get("popupProfile").resetValidation();
}

function addCard(cardElement, pos = "end") {
  // отображаем на странице
  if (pos === "start") {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

cards.forEach((element) => {
  addCard(new Card(element.name, element.path, "#card").createCard());
});

buttonAddElement.addEventListener("click", openPopupCard);
buttonEdit.addEventListener("click", openPopupProfile);

const buttonsClose = document.querySelectorAll(".popup__close-icon");

buttonsClose.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  // button.addEventListener("click", () => closePopup(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target === button || evt.target === popup) {
      closePopup(popup);
    }
  });
});

popupProfileForm.addEventListener("submit", handleProfileFormSubmit);
popupCardForm.addEventListener("submit", handleCardFormSubmit);

import { FormValidator, objectValidation } from "./FormValidator.js";

const mapForms = new Map();

const formElems = document.querySelectorAll(objectValidation.formSelector);
formElems.forEach((formElem) => {
  const FormValidatorObject = new FormValidator(objectValidation, formElem);
  FormValidatorObject.enableValidation();
  FormValidatorObject.resetValidation();
  if (formElem.name=="popup-profile__form") {
    mapForms.set("popupProfile", FormValidatorObject); 
  }
  if (formElem.name=="popup-card__form") {
    mapForms.set("popupCard", FormValidatorObject);
  }
});
