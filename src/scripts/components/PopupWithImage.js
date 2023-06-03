import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(classSelector) {
    super(classSelector);
    this.popupImgImage = document.querySelector(".popup-image__image");
    this.popupImgDescription = document.querySelector(
      ".popup-image__description"
    );
  }

  setDate(path, name) {
    this.path = path;
    this.name = name;
  }

  open() {
    this.popupImgImage.src = this.path;
    this.popupImgImage.alt = this.name;
    this.popupImgDescription.textContent = this.name;
    super.open();
  }
}
