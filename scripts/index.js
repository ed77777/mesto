const popup = document.querySelector(".popup");
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

const popupFormElem = document.querySelector(".popup-profile__form");
const popupCardForm = document.querySelector(".popup-card__form");

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

function deleteElement(evt) {
  console.log(evt.target.parentNode);
  evt.target.parentNode.remove();
}

function elementImgOpenFullSize(evt) {
  // console.log(1);
  openPopup(popupImage);
  const popupImg2 = document.querySelector(".popup-image__image");
  popupImg2.setAttribute("src", evt.target.src);
}

function submitpopupForm(evt) {
  evt.preventDefault();
  closePopup(evt);
  profileTitleElem.textContent = inputUserNameElem.value;
  profileDescrElem.textContent = inputDescrElem.value;
}

function submitpopupCardForm(evt) {
  evt.preventDefault();
  closePopup(evt);
  addElement(inputCardDescription.value,inputCardTitle.value, "start");
}


function openPopup(popupElem) {
  popupElem.classList.add("popup_opened");
}

function closePopup(evt) {
  let node = evt.target;
  while (true) {
    if (node.classList.contains("popup_opened")) {
      node.classList.remove("popup_opened");
      break;
    } else {
      node = node.parentNode;
    }
  }
}

function openPopupCard() {
  openPopup(popupCard);
}

function openPopupProfile() {
  inputUserNameElem.value = profileTitleElem.innerText;
  inputDescrElem.value = profileDescrElem.innerText;
  openPopup(popupProfile);
}

function addElement(path, name, pos = "end") {
  // console.log(path);
  // клонируем содержимое тега template
  const cardElement = cardTemplate.cloneNode(true);

  // наполняем содержимым
  cardElement.querySelector(".element__img").src = path;
  cardElement.querySelector(".element__img").alt = name;
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
    .addEventListener("click", elementImgOpenFullSize);

  // отображаем на странице
  if (pos === "start") {
    elements.prepend(cardElement);
  } else {
    elements.append(cardElement);
  }
}

for (let index = 0; index < cards.length; index++) {
  const element = cards[index];
  addElement(element.path, element.name);
}

buttonAddElement.addEventListener("click", openPopupCard);
buttonEdit.addEventListener("click", openPopupProfile);

let closeIcons = document.querySelectorAll(".popup__close-icon");

for (let closeIcon of closeIcons) {
  closeIcon.addEventListener("click", closePopup);
}

popupFormElem.addEventListener("submit", submitpopupForm);
popupCardForm.addEventListener("submit", submitpopupCardForm);

