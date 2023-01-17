export default class UserInfo {
  constructor({ classSelectorName, classSelectorInfo }) {
    this.profileTitleElem = document.querySelector(classSelectorName);
    this.profileDescriptionElem = document.querySelector(
      classSelectorInfo
    );
  }

  getUserInfo() {
    return {name: this.profileTitleElem.textContent, info: this.profileDescriptionElem.textContent};
  }

  setUserInfo(name, info) {
    this.profileTitleElem.textContent = name;
    this.profileDescriptionElem.textContent = info;
  }
}
