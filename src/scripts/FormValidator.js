export class FormValidator {
  constructor(objectValidation, formElem) {
    this.objectValidation = objectValidation;
    this.formElem = formElem;
    this.buttonElem = formElem.querySelector(
      this.objectValidation.submitButtonSelector
    );
    this.inputList = Array.from(
      formElem.querySelectorAll(objectValidation.inputSelector)
    );
    this.errorList = Array.from(
      formElem.querySelectorAll(`.popup__error`)
    );
  }

  enableValidation() {
    this.formElem.addEventListener("input", (evt) => {
      this._checkInputValidity(evt);
      this._toggleButtonState();
    });
  }

  resetValidation() {
    this._toggleButtonState();
    this._hideInputErrors();
  }

  _hideInputErrors() {
    // const errorElems = this.formElem.querySelectorAll(`.popup__error`);
    this.errorList.forEach((errorElem) => {
      errorElem.textContent = "";
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

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.buttonElem.classList.add(this.objectValidation.inactiveButtonClass);
      this.buttonElem.disabled = true;
    } else {
      this.buttonElem.classList.remove(
        this.objectValidation.inactiveButtonClass
      );
      this.buttonElem.disabled = false;
    }
  }

  _hasInvalidInput() {
    return this.inputList.some((inputElement) => {
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
