export default class Popup {
  // constructor(classSelector, formName) {
  constructor(classSelector) {
    this._popupElement = document.querySelector(classSelector);
  }

  open() {
    this._popupElement.classList.add("popup_opened");
    document.addEventListener("keydown", (evt) => {
      this._handleEscClose(evt);
    });
    this.setEventListeners();
  }
  
  close() {
    this._popupElement.classList.remove("popup_opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
      // document.removeEventListener("keydown", handleCloseByEsc);
      document.removeEventListener("keydown", (evt) => {
        this._handleEscClose(evt);
      });
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
