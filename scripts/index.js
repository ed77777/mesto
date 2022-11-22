const popupProfile = document.querySelector(".popup-profile");
const popupCard = document.querySelector(".popup-card");
const popupImage = document.querySelector(".popup-image");

const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAddElement = document.querySelector(".profile__button-add");
const profileTitleElem = document.querySelector(".profile__title");
const profileDescrElem = document.querySelector(".profile__description");
const inputUserNameElem = document.querySelector(
  ".popup-profile__input_input_title"
);
const inputDescrElem = document.querySelector(
  ".popup-profile__input_input_description"
);

const inputCardTitle = document.querySelector(".popup-card__input_input_title");
const inputCardDescription = document.querySelector(
  ".popup-card__input_input_description"
);

const popupProfileForm = document.forms["popup-profile__form"];
const popupCardForm = document.forms["popup-card__form"];

const popupProfiletitle = document.querySelector(".popup-profile__title");
const popupProfileImg = document.querySelector(".popup-profile-img");

const cards = [
  { path: "./images/1.png", name: "Город в пустыне" },
  { path: "./images/2.png", name: "Девушка" },
  { path: "./images/3.png", name: "Скала" },
  { path: "./images/4.png", name: "Архитектура" },
  { path: "./images/5.png", name: "Город" },
  { path: "./images/6.png", name: "Лес" },
];

const cardTemplate = document.querySelector("#card").content;
const elements = document.querySelector(".elements");

const popupImgImage = document.querySelector(".popup-image__image");
const popupImgDescr = document.querySelector(".popup-image__description");

function deleteElement(evt) {
  evt.target.closest(".element").remove();
}

function openFullSizeImage(path, name) {
  openPopup(popupImage);

  popupImgImage.setAttribute("src", path);
  popupImgImage.setAttribute("alt", name);
  popupImgDescr.textContent = name;
}

function submitPopupProfileForm(evt) {
  evt.preventDefault();
  closePopup(popupProfile);
  profileTitleElem.textContent = inputUserNameElem.value;
  profileDescrElem.textContent = inputDescrElem.value;
}

function submitPopupCardForm(evt) {
  evt.preventDefault();
  closePopup(popupCard);
  addElement(
    createCard(inputCardTitle.value, inputCardDescription.value),
    "start"
  );
  evt.target.reset();
}

function openPopup(popupElem) {
  popupElem.classList.add("popup_opened");
}

function closePopup(popupElem) {
  // console.log(popupElem);
  popupElem.classList.remove("popup_opened");
}

function openPopupCard() {
  openPopup(popupCard);
}

function openPopupProfile() {
  inputUserNameElem.value = profileTitleElem.innerText;
  inputDescrElem.value = profileDescrElem.innerText;
  openPopup(popupProfile);
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
    .addEventListener("click", deleteElement);
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

function addElement(cardElement, pos = "end") {
  // отображаем на странице
  if (pos === "start") {
    elements.prepend(cardElement);
  } else {
    elements.append(cardElement);
  }
}

cards.forEach((element) => {
  addElement(createCard(element.name, element.path));
});

buttonAddElement.addEventListener("click", openPopupCard);
buttonEdit.addEventListener("click", openPopupProfile);

const closeButtons = document.querySelectorAll(".popup__close-icon");

closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап
  const popup = button.closest(".popup");
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener("click", () => closePopup(popup));
});

popupProfileForm.addEventListener("submit", submitPopupProfileForm);
popupCardForm.addEventListener("submit", submitPopupCardForm);
