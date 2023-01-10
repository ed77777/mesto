export default class UserInfo {
  constructor({ name, info }) {
    this.name = name;
    this.info = info;
  }

  getUserInfo() {
    return { name: this.name, info: this.info };
  }

  setUserInfo(name, info) {
    this.name = name;
    this.info = info;
  }
}
