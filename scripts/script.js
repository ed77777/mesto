const popupElem = document.querySelector(".popup");
const buttonPen = document.querySelector(".profile__button-edit");
const profileTitleElem = document.querySelector(".profile__title");
const profileDescrElem = document.querySelector(".profile__description");
const popupInputElem1 = document.querySelector(".popup__input1");
const popupInputElem2 = document.querySelector(".popup__input2");

// alert(1);

buttonPen.addEventListener("click", () => {
  popupElem.classList.add("popup_opened");
  popupInputElem1.value = profileTitleElem.innerText;
  popupInputElem2.value = profileDescrElem.innerText;
});

const buttonSave = document.querySelector(".popup__button-save");
buttonSave.addEventListener("click", () => {
  popupElem.classList.remove("popup_opened");
  profileTitleElem.textContent = popupInputElem1.value;
  profileDescrElem.textContent = popupInputElem2.value;
});

const buttonCloseIcon = document.querySelector(".popup__closeIcon");
buttonCloseIcon.addEventListener("click", () => {
  popupElem.classList.remove("popup_opened");
});
