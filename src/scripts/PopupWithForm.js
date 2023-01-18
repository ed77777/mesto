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

  _getInputValues() {

    const answer = {};
    Array.from(document.forms[this._formName].elements).forEach((element) => {
      answer[element.name] = element.value;
    });

    // console.log(answer);
    
    return answer;
  }

  setEventListeners() {
    super.setEventListeners();
    document.forms[this._formName].addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
      // const sadsa = this._getInputValues();
      // this._handleFormSubmit(evt);
    });
  }
}
