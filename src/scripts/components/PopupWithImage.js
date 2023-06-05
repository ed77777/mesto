import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(classSelector) {
    super(classSelector);
    this.popupImgImage = document.querySelector(".popup-image__image");
    this.popupImgDescription = document.querySelector(
      ".popup-image__description"
    );
  }

  // setDate(path, name) {
  //   this.path = path;
  //   this.name = name;
  // }

  open(path, name) {
    super.setEventListeners();
    this.popupImgImage.src = path;
    this.popupImgImage.alt = name;
    this.popupImgDescription.textContent = this.name;
    super.open();
  }
}
