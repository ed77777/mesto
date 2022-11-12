const popupElem = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const profileTitleElem = document.querySelector(".profile__title");
const profileDescrElem = document.querySelector(".profile__description");
const inputUserNameElem = document.querySelector(".popup__input_input_1");
const inputDescrElem = document.querySelector(".popup__input_input_2");

const popupFormElem = document.querySelector(".popup__form");

popupFormElem.addEventListener("submit", submitpopupForm);

function  submitpopupForm(evt) {
  evt.preventDefault();
  popupElem.classList.remove("popup_opened");
  profileTitleElem.textContent = inputUserNameElem.value;
  profileDescrElem.textContent = inputDescrElem.value;
}

function  openPopup() {
  popupElem.classList.add("popup_opened");
  inputUserNameElem.value = profileTitleElem.innerText;
  inputDescrElem.value = profileDescrElem.innerText;
}

buttonEdit.addEventListener("click", openPopup);

// function  closeAndSavePopup() {
//   popupElem.classList.remove("popup_opened");
//   profileTitleElem.textContent = popupInput1Elem.value;
//   profileDescrElem.textContent = popupInput2Elem.value;
// }

// const buttonSave = document.querySelector(".popup__button-save");
// buttonSave.addEventListener("click", closeAndSavePopup);

function  closePopup() {
  popupElem.classList.remove("popup_opened");
}

const buttonCloseIcon = document.querySelector(".popup__closeIcon");
buttonCloseIcon.addEventListener("click", closePopup);
