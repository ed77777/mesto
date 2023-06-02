export default class UserInfo {
  constructor({ classSelectorName, classSelectorInfo, classSelectorImage, classSelectorImageEdit, handleImageClick}) {
    this.profileTitleElem = document.querySelector(classSelectorName);
    this.profileDescriptionElem = document.querySelector(classSelectorInfo);
    this.profileImage = document.querySelector(classSelectorImage);
    this.profileImageEdit = document.querySelector(classSelectorImageEdit);
    this._handleImageClick = handleImageClick;
    this.setEventListeners();
  }

  getUserInfo() {
    return {
      name: this.profileTitleElem.textContent,
      info: this.profileDescriptionElem.textContent,
    };
  }

  setUserInfo(name, info, avatar, id) {
    this.profileTitleElem.textContent = name;
    this.profileDescriptionElem.textContent = info;
    this.profileImage.src = avatar;
    this.id = id;
  }

  setEventListeners() {
    this.profileImageEdit.addEventListener("click", (evt) => {
      this._handleImageClick(evt);
    });
  }
}
