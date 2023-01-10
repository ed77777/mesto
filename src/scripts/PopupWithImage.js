import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(path, name, classSelector) {
    super(classSelector);
    this.path = path;
    this.name = name;
  }

  open() {
    super.open();

    const popupImage = document.querySelector(".popup-image");
    const popupImgImage = document.querySelector(".popup-image__image");
    const popupImgDescription = document.querySelector(
      ".popup-image__description"
    );

    popupImgImage.src = this.path;
    popupImgImage.alt = this.name;
    popupImgDescription.textContent = this.name;
  }
}
