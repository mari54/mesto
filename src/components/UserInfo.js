export class UserInfo {
  constructor({ profileName, profileAbout }) {
    this._profileName = profileName;
    this._profileAbout = profileAbout;
  }

  getUserInfo() {
    const userProfile = {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };

    return userProfile;
  }

  setUserInfo({ name, about }) {
    this._profileName.textContent = name;
    this._profileAbout.textContent = about;
  }
}
