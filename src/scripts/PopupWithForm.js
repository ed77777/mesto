import Popup from "./Popup.js";
import {
  profileTitleElem,
  profileDescriptionElem,
  inputUserNameElem,
  inputDescriptionElem,
} from "./index.js";

export default class PopupWithForm extends Popup {
  constructor(title, description, classSelector, formName, handleFormSubmit) {
    super(classSelector, formName);
    this.title = title;
    this.description = description;
    inputUserNameElem.value = title;
    inputDescriptionElem.value = description;
    this._handleFormSubmit = handleFormSubmit;
  }

  open() {
    super.open();
  }

  handleProfileFormSubmit(evt) {
    evt.preventDefault();
    profileTitleElem.textContent = inputUserNameElem.value;
    profileDescriptionElem.textContent = inputDescriptionElem.value;
    // clearError(evt.target);
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    document.forms[this._formName].addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt);
    });
  }
}
