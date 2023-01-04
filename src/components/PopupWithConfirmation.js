import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ popupSelector, removeCardForSure }) {
    super(popupSelector);
    this._form = this._popup.querySelector(".form_you-sure");
    this._removeCardForSure = removeCardForSure;
  }

  open(card) {
    super.open();
    this._card = card;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._removeCardForSure(this._card)
    });
  }
}
