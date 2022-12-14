export class FormValidator {
  constructor(objectValidation, formElem) {
    this.objectValidation = objectValidation;
    this.formElem = formElem;
  }

  enableValidation() {
    const inputList = Array.from(
      this.formElem.querySelectorAll(this.objectValidation.inputSelector)
    );
    const buttonElem = this.formElem.querySelector(
      this.objectValidation.submitButtonSelector
    );

    this.formElem.addEventListener("input", (evt) => {
      this._checkInputValidity(evt);
      this._toggleButtonState(inputList, buttonElem);
    });
  }

  _checkInputValidity(evt) {
    const inputErrorElem = this.formElem.querySelector(
      `.${evt.target.name}-error`
    );
    if (!evt.target.validity.valid) {
      inputErrorElem.textContent = evt.target.validationMessage;
      evt.target.classList.add(this.objectValidation.inputErrorClass);
    } else {
      inputErrorElem.textContent = "";
      evt.target.classList.remove(this.objectValidation.inputErrorClass);
    }
  }

  _toggleButtonState(inputList, buttonElem) {
    if (this._hasInvalidInput(inputList)) {
      buttonElem.classList.add(this.objectValidation.inactiveButtonClass);
      buttonElem.disabled = true;
    } else {
      buttonElem.classList.remove(this.objectValidation.inactiveButtonClass);
      buttonElem.disabled = false;
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }
}

export const objectValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};
