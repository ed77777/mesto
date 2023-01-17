import Popup from "./Popup.js";
import { inputUserNameElem, inputDescriptionElem } from "./globalМariables.js";

export default class PopupWithForm extends Popup {
  constructor(classSelector, formName, handleFormSubmit) {
    super(classSelector);
    this._formName = formName;
    this._handleFormSubmit = handleFormSubmit;
  }

  setInputValues(title, description) {
    inputUserNameElem.value = title;
    inputDescriptionElem.value = description;
  }

  getInputValues() {
    const answer = new Map();
    answer.set("UserName", inputUserNameElem.value);
    answer.set("Description", inputDescriptionElem.value);
    // return new Map() {inputUserNameElem.value,inputDescriptionElem.value}
    return answer;
  }

  setEventListeners() {
    super.setEventListeners();
    document.forms[this._formName].addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt);
    });
  }
}
