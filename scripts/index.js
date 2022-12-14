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
    createCard(inputCardTitle.value, inputCardDescription.value),
    "start"
  );
  evt.target.reset();
  closePopup(popupCard);
  clearError(evt.target);
}

function openPopup(popupElem) {
  popupElem.classList.add("popup_opened");
  addEventListenerEsc();
}

function closePopup(popupElem) {
  popupElem.classList.remove("popup_opened");
  removeEventListenerEsc();
}

function clearError(form) {
  const errorElems = form.querySelectorAll(`.popup__error`);
  errorElems.forEach((errorElem) => {
    errorElem.textContent = "";
  });
  const buttonElem = form.querySelector(`.popup__button`);
  buttonElem.disabled = false;
  buttonElem.classList.remove("popup__button_disabled");
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
  buttonCardSubmit.disabled = true;
  buttonCardSubmit.classList.add("popup__button_disabled");
}

function openPopupProfile() {
  inputUserNameElem.value = profileTitleElem.innerText;
  inputDescriptionElem.value = profileDescriptionElem.innerText;
  openPopup(popupProfile);
  clearError(popupProfile);
}

function addCard(cardElement, pos = "end") {
  // отображаем на странице
  if (pos === "start") {
    cardsContainer.prepend(cardElement);
  } else {
    cardsContainer.append(cardElement);
  }
}

import { cards } from "./date.js";
import { Card } from "./card.js";

cards.forEach((element) => {
  addCard(new Card(element.name, element.path, "#card").createCard());
});

buttonAddElement.addEventListener("click", openPopupCard);
buttonEdit.addEventListener("click", openPopupProfile);

const closeButtons = document.querySelectorAll(".popup__close-icon");

closeButtons.forEach((button) => {
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

const formElems = document.querySelectorAll(objectValidation.formSelector);
formElems.forEach((formElem) => {   
  const FormValidatorObject = new FormValidator(objectValidation,formElem);
  FormValidatorObject.enableValidation();
});