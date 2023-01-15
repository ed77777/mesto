export default class Popup {
  constructor(classSelector, formName) {
    this._popupElement = document.querySelector(classSelector);
    this._formName = formName;
    this.setEventListeners();
  }

  open() {
    this._popupElement.classList.add("popup_opened");
  }
  close() {
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      document.removeEventListener("keydown", handleCloseByEsc);
    }
  }

  setEventListeners() {
    const buttonClose = this._popupElement.querySelector(".popup__close-icon");
    // устанавливаем обработчик закрытия на крестик
    this._popupElement.addEventListener("mousedown", (evt) => {
      if (evt.target === this._popupElement || evt.target === buttonClose) {
        this.close();
      }
    });
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
  }
}
