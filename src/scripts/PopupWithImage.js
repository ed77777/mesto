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
    super.open();

    // const popupImage = document.querySelector(".popup-image");
    this.popupImgImage.src = this.path;
    this.popupImgImage.alt = this.name;
    popupImgDescription.textContent = this.name;
  }
}
