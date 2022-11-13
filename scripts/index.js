const popupElem = document.querySelector(".popup");
const buttonEdit = document.querySelector(".profile__button-edit");
const profileTitleElem = document.querySelector(".profile__title");
const profileDescrElem = document.querySelector(".profile__description");
const inputUserNameElem = document.querySelector(".popup__input_input_1");
const inputDescrElem = document.querySelector(".popup__input_input_2");
const popupFormElem = document.querySelector(".popup__form");
const buttonCloseIcon = document.querySelector(".popup__close-icon");

function submitpopupForm(evt) {
  evt.preventDefault();
  closePopup();
  // popupElem.classList.remove("popup_opened");
  profileTitleElem.textContent = inputUserNameElem.value;
  profileDescrElem.textContent = inputDescrElem.value;
}

function openPopup() {
  popupElem.classList.add("popup_opened");
  inputUserNameElem.value = profileTitleElem.innerText;
  inputDescrElem.value = profileDescrElem.innerText;
}

function closePopup() {
  popupElem.classList.remove("popup_opened");
}

buttonCloseIcon.addEventListener("click", closePopup);
buttonEdit.addEventListener("click", openPopup);
popupFormElem.addEventListener("submit", submitpopupForm);
