let popupAction;

const popupElem = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const buttonAddElement = document.querySelector(".profile__button-add");
const profileTitleElem = document.querySelector(".profile__title");
const profileDescrElem = document.querySelector(".profile__description");
const inputUserNameElem = document.querySelector(".popup__input_input_title");
const inputDescrElem = document.querySelector(
  ".popup__input_input_description"
);
const popupFormElem = document.querySelector(".popup__form");
const buttonCloseIcon = document.querySelector(".popup__close-icon");
const popuptitle = document.querySelector(".popup__title");
const popupImg = document.querySelector(".popup-img");
const popupImgCloseIcon = document.querySelector(".popup-img__close-icon");
const cards = [
  { path: "./images/1.png", name: "ывавыавы" },
  { path: "./images/2.png", name: "dsfdsf" },
  { path: "./images/3.png", name: "dsfdsf" },
  { path: "./images/4.png", name: "dsfdsf" },
  { path: "./images/5.png", name: "dsfdsf" },
  { path: "./images/6.png", name: "dsfdsf" },
];

const cardTemplate = document.querySelector("#card").content;
const elements = document.querySelector(".elements");

function deleteElement(evt) {
  console.log(evt.target.parentNode);
  evt.target.parentNode.remove();
}

function elementImgOpenFullSize(evt) {
  console.log(1);
  popupImg.classList.toggle("popup-img_opened");
  const popupImg2 = document.querySelector(".popup-img__image");
  popupImg2.setAttribute("src", evt.target.src);
}

function submitpopupForm(evt) {
  evt.preventDefault();
  closePopup();
  // console.log(popupAction);
  if (popupAction === "edit") {
    profileTitleElem.textContent = inputUserNameElem.value;
    profileDescrElem.textContent = inputDescrElem.value;
  } else {
    addElement(inputDescrElem.value, inputUserNameElem.value, "start");
  }
}

function openPopup() {
  popupAction = "edit";
  popuptitle.textContent = "Редактировать профиль";
  popupElem.classList.add("popup_opened");
  inputUserNameElem.value = profileTitleElem.innerText;
  inputDescrElem.value = profileDescrElem.innerText;
}

function closePopup() {
  popupElem.classList.remove("popup_opened");
}

function openPopupAddElement() {
  popupAction = "add";
  popupElem.classList.add("popup_opened");
  popuptitle.textContent = "Новое место";
  inputUserNameElem.value = "";
  inputDescrElem.value = "";
}

function addElement(path, name, pos = "end") {
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

buttonCloseIcon.addEventListener("click", closePopup);
buttonEdit.addEventListener("click", openPopup);
popupFormElem.addEventListener("submit", submitpopupForm);
buttonAddElement.addEventListener("click", openPopupAddElement);
popupImgCloseIcon.addEventListener("click", function () {
  popupImg.classList.remove("popup-img_opened");
});
