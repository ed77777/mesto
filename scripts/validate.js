function checkInputValidity(evt, element, objectValidation) {
  const inputErrorElem = element.querySelector(`.${evt.target.name}-error`);
  if (!evt.target.validity.valid) {
    inputErrorElem.textContent = evt.target.validationMessage;
  } else {
    inputErrorElem.textContent = "";
  }
}

function toggleButtonState(formElem, inputList, buttonElem, objectValidation) {
  if (hasInvalidInput(inputList)) {
    buttonElem.classList.add(objectValidation.inactiveButtonClass);
    buttonElem.setAttribute("disabled", true);
  } else {
    buttonElem.classList.remove(objectValidation.inactiveButtonClass);
    buttonElem.removeAttribute("disabled");
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
    formElem.addEventListener("input", function (evt) {
      checkInputValidity(evt, formElem, objectValidation);

      const inputList = Array.from(
        formElem.querySelectorAll(objectValidation.inputSelector)
      );
      const buttonElem = formElem.querySelector(
        objectValidation.submitButtonSelector
      );

      toggleButtonState(formElem, inputList, buttonElem, objectValidation);
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
