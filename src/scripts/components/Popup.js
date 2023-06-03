export default class Popup {
  // constructor(classSelector, formName) {
  constructor(classSelector) {
    this._popupElement = document.querySelector(classSelector);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", this._closeByEsc);
    // this.setEventListeners();
  }

  close() {
    this._popupElement.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._closeByEsc);
  }

  _closeByEsc = (evt) => {
    this._handleEscClose(evt);
  };

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
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
  }
}
