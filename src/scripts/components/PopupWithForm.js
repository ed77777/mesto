import Popup from "./Popup.js";
import { inputUserNameElem, inputDescriptionElem } from "../utils/globalVariables.js";

export default class PopupWithForm extends Popup {
  constructor(classSelector, formName, handleFormSubmit, classSelectorButtonSubmit) {
    super(classSelector);
    this._formName = formName;
    this._handleFormSubmit = handleFormSubmit;
    this._fields = Array.from(document.forms[this._formName].elements);
    this.setEventListeners();
    // this._arrayInputs = new Array;
    // this._arrayInputs.push(inputUserNameElem);
    // this._arrayInputs.push(inputDescriptionElem);
    // this._arrayInputs.push(inputDescriptionElem);
    this.buttonSubmit = document.querySelector(classSelectorButtonSubmit);
    this.formElement = document.forms[this._formName]; 
  }

  // setInputValues(title, description) {
  //   inputUserNameElem.value = title;
  //   inputDescriptionElem.value = description;
  // }

  close() {
    super.close();
    this.formElement.reset();
  }


  // setInputValues(objectValues) {
    // this._arrayInputs.forEach(element => {
    //   element.value = objectValues[element.name];
    // });
    // inputUserNameElem.value = values['inputUserNameElem'];
    // inputDescriptionElem.value = values['inputDescriptionElem'];
  // }

  _getInputValues() {
    const answer = {};
    this._fields.forEach((element) => {
      answer[element.name] = element.value;
    });
    return answer;
  }

  setEventListeners() {
    // super.setEventListeners();
    super.setEventListeners();
    document.forms[this._formName].addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt, this._getInputValues());
      // const sadsa = this._getInputValues();
      // this._handleFormSubmit(evt);
    });
  }
}
