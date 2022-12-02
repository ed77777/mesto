function checkInputValidity(evt, element, objectValidation) {
  const inputErrorElem = element.querySelector(`.${evt.target.name}-error`);
  if (!evt.target.validity.valid) {
    inputErrorElem.textContent = evt.target.validationMessage;

    enableToggleButtonStateValidation(element, objectValidation, false);
  } else {
    inputErrorElem.textContent = "";
    enableToggleButtonStateValidation(element, objectValidation, true);
  }
  // console.log(evt);
}

function enableToggleButtonStateValidation(element, objectValidation, valid) {
  const buttonElem = element.querySelector(
    objectValidation.submitButtonSelector
  );
  buttonElem.setAttribute("disabled", !valid);
  if (valid) {
    buttonElem.classList.remove(objectValidation.inactiveButtonClass);
  } else {
    buttonElem.classList.add(objectValidation.inactiveButtonClass);
  }
}

function enableValidation(objectValidation) {
  const formElems = document.querySelectorAll(objectValidation.formSelector);

  formElems.forEach((element) => {
    element.addEventListener("input", function (evt) {
      checkInputValidity(evt, element, objectValidation);
      // toggleButtonState(element,objectValidation);
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
