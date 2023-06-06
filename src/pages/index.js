import "./index.css"; // добавьте импорт главного файла стилей

import {
  inputUserNameElem,
  inputDescriptionElem,
} from "../scripts/utils/globalVariables";
import { Section } from "../scripts/components/Section.js";
import { cards } from "../scripts/utils/date.js";
import { Card } from "../scripts/components/Card.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupConfirmation from "../scripts/components/PopupConfirmation.js";
import {
  FormValidator,
  objectValidation,
} from "../scripts/components/FormValidator.js";
import UserInfo from "../scripts/components/UserInfo.js";

import {
  buttonEdit,
  buttonAddElement,
} from "../scripts/utils/globalVariables.js";

import Api from "../scripts/components/Api.js";

const popupConfirmation = new PopupConfirmation(
  ".popup-confirmation",
  "popup-confirmation__form",
  handleConfirmationFormSubmit
);

function handleConfirmationFormSubmit(evt, card) {
  evt.preventDefault();

  // console.log(card);

  api
    .deleteCard("cards", this.cardId)
    .then(() => {
      // this.element.remove();
      // this.element = null;
      card.deleteElementCard();
      popupConfirmation.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    });
}

const popupProfile = new PopupWithForm(
  ".popup-profile",
  "popup-profile__form",
  handleProfileFormSubmit,
  ".popup-profile__button-save"
);

const popupNewCard = new PopupWithForm(
  ".popup-card",
  "popup-card__form",
  handleCardFormSubmit,
  ".popup-card__button-save"
);

const popupImage = new PopupWithImage(".popup-image");

function openPopupProfile() {
  const userinfo2 = userInfo.getUserInfo();
  // popupProfile.setInputValues(userinfo2.name, userinfo2.info);ы
  // popupProfile.setInputValues({
  //   "popup__input-title": userinfo2.name,
  //   "popup__input-description": userinfo2.info,
  // });

  inputUserNameElem.value = userinfo2.name;
  inputDescriptionElem.value = userinfo2.info;

  popupProfile.open();
  mapForms.get("popupProfile").resetValidation();
}

function openPopupCard() {
  popupNewCard.open();
  mapForms.get("popupCard").resetValidation();
}

function handleProfileFormSubmit(evt, answer) {
  evt.preventDefault();

  this.buttonSubmit.innerText = "Сохранение...";

  const promiseEditUserInfo = api
    .editDataProfile(
      "users/me",
      answer["popup__input-title"],
      answer["popup__input-description"]
    )
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
      popupProfile.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      this.buttonSubmit.innerText = "Сохранить";
    });
}

function handleCardFormSubmit(evt, answer) {
  evt.preventDefault();

  this.buttonSubmit.innerText = "Сохранение...";

  api
    .addNewCard(
      "cards",
      answer["popup-card__input-title"],
      answer["popup-card__input-description"]
    )
    .then((data) => {
      section.addItem(createCard(data));
      popupNewCard.close();
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      this.buttonSubmit.innerText = "Сохранить";
    });
}

buttonAddElement.addEventListener("click", openPopupCard);
buttonEdit.addEventListener("click", openPopupProfile);

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

// function handleCardClick() {
//   // popupImage.setDate(this.path, this.name);
//   popupImage.open(this.path, this.name);
// }

// function handleCardDelete() {
//   popupConfirmation.cardId = this.item._id;
//   popupConfirmation.element = this._element;
//   popupConfirmation.item = this;

//   popupConfirmation.open();
// }

function createCard(item) {
  const card = new Card(
    item.name,
    item.link,
    "#card",
    ()=>{popupImage.open(card.path, card.name)},
    item,
    // handleCardDelete,
    () => {
      popupConfirmation.cardId = card.item._id;
      popupConfirmation.element = card._element;
      popupConfirmation.item = card;
      popupConfirmation.open();
    },

    () => {
      let methodName;
      if (card._buttonLike.classList.contains("element__heart_active")) {
        methodName = "DELETE";
      } else {
        methodName = "PUT";
      }
      api
        .setDeleteLike("cards/" + item._id + "/likes", methodName)
        .then((res) => {
          // console.log(`addLike ---`, res);
          // card.updateLikes(res.likes)
          card.toggleLikes();
          // card._buttonLike.classList.toggle("element__heart_active");
          card.updateLikes(res.likes.length);
          // console.log(res.likes.length);
        })
        .catch((err) => {
          console.log(`Ошибка добавления лайка: `, err);
        });
    }
  );

  // card.test();
  // card.deleteElementCard();

  return card.createCard();
}

const section = new Section(
  {
    data: cards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  ".elements"
);

export const api = new Api("https://mesto.nomoreparties.co/v1/cohort-66/", {
  // authorization: "bded0b96-741a-4aec-a12c-3032e1055b83",
  authorization: "79335ee4-3f4b-46aa-805e-b15476f4972e",
  "Content-Type": "application/json",
});

export const userInfo = new UserInfo({
  classSelectorName: ".profile__title",
  classSelectorInfo: ".profile__description",
  classSelectorImage: ".profile__image",
  classSelectorImageEdit: ".profile__conteiner",
  handleImageClick,
});

api
  .getUserData("users/me")
  .then((data) => {
    userInfo.setUserInfo(data.name, data.about, data.avatar, data._id);

    api
      .getUserData("cards")
      .then((data) => {
        section._renderedItems = data;
        section.renderItems();
      })
      .catch((err) => {
        console.log(err); // выведем ошибку в консоль
      });
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });

function handleUpdateAvatarFormSubmit(evt, answer) {
  evt.preventDefault();

  this.buttonSubmit.innerText = "Сохранение...";

  const promiseEditAvatar = api
    .editAvatar("users/me/avatar ", answer["popup__input-link"])
    .then((data) => {
      userInfo.setUserInfo(data.name, data.about, data.avatar);
    })
    .catch((err) => {
      console.log(err); // выведем ошибку в консоль
    })
    .finally(() => {
      this.buttonSubmit.innerText = "Да";
    });
  popupUpdateAvatar.close();
}

const popupUpdateAvatar = new PopupWithForm(
  ".popup-update-avatar",
  "popup-update-avatar",
  handleUpdateAvatarFormSubmit,
  ".popup-update-avatar__button"
);

function handleImageClick() {
  popupUpdateAvatar.open();
}
