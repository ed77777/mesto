import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(classSelector, formName, handleFormSubmit) {
    super(classSelector);
    this._formName = formName;
    this._handleFormSubmit = handleFormSubmit;
    this.setEventListeners();
  }

  // close() {
  //   super.close();
  // }

  setSubmitAction(callback) {
    this._callback = callback;
  }

  _getDate() {
    return this.item;
  }

  setEventListeners() {
    super.setEventListeners();
    document.forms[this._formName].addEventListener("submit", (evt) => {
      this._handleFormSubmit(evt,this._getDate());
      // this._callback();
    });
  }
}
