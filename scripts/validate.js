function checkInputValidity(evt, form, objectValidation) {
  const inputErrorElem = form.querySelector(`.${evt.target.name}-error`);
  if (!evt.target.validity.valid) {
    inputErrorElem.textContent = evt.target.validationMessage;
    evt.target.classList.add(objectValidation.inputErrorClass);
  } else {
    inputErrorElem.textContent = "";
    evt.target.classList.remove(objectValidation.inputErrorClass);
  }
}

function toggleButtonState(inputList, buttonElem, objectValidation) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add(objectValidation.inactiveButtonClass);
    buttonElem.disabled=true;
  } else {
    buttonElem.classList.remove(objectValidation.inactiveButtonClass);
    buttonElem.disabled=false;
  }
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function enableValidation(objectValidation) {
  const formElems = document.querySelectorAll(objectValidation.formSelector);
  formElems.forEach((formElem) => {

    const inputList = Array.from(
      formElem.querySelectorAll(objectValidation.inputSelector)
    );
    const buttonElem = formElem.querySelector(
      objectValidation.submitButtonSelector
    );

    formElem.addEventListener("input", function (evt) {
      checkInputValidity(evt, formElem, objectValidation);
      toggleButtonState(inputList, buttonElem, objectValidation);
    });
  });
}

enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
});
