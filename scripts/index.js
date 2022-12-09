const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const popupImage = document.querySelector(".popup-image");

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

const cardTemplate = document.querySelector("#card").content;
const cardsContainer = document.querySelector(".elements");

const popupImgImage = document.querySelector(".popup-image__image");
const popupImgDescription = document.querySelector(".popup-image__description");

function handleCardDelete(evt) {
  evt.target.closest(".element").remove();
}

function openFullSizeImage(path, name) {
  openPopup(popupImage);

  popupImgImage.src = path;
  popupImgImage.alt = name;
  popupImgDescription.textContent = name;
}

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
  buttonCardSubmit.classList.add('popup__button_disabled');
}

function openPopupProfile() {
  inputUserNameElem.value = profileTitleElem.innerText;
  inputDescriptionElem.value = profileDescriptionElem.innerText;
  openPopup(popupProfile);
  clearError(popupProfile);
}

function createCard(name, path) {
  // клонируем содержимое тега template

  const cardElement = cardTemplate.cloneNode(true);

  const cardElementImage = cardElement.querySelector(".element__img");

  // наполняем содержимым
  cardElementImage.src = path;
  cardElementImage.alt = name;
  cardElement.querySelector(".element__paragraph").textContent = name;

  cardElement
    .querySelector(".element__trash-can")
    .addEventListener("click", handleCardDelete);
  //   .addEventListener("click", () => {
  //     cardElement.remove();
  // });  //попытка сделать через замыкание, чет не заработало

  cardElement
    .querySelector(".element__heart")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("element__heart_active");
    });

  cardElement
    .querySelector(".element__img")
    .addEventListener("click", () => openFullSizeImage(path, name));

  return cardElement;
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
  addCard(createCard(element.name, element.path));
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
