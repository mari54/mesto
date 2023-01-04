export default class UserInfo {
  constructor({ profileName, profileAbout, profileAvatar }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    const userProfile = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
      avatar: this._profileAvatar.src
    };

    return userProfile;
  }

  setUserInfo({ name, about, avatar }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
    this._profileAvatar.src = avatar;
  }
}
