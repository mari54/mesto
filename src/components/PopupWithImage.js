import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(".popup__image");
    this._popupDescription = this._popup.querySelector(".popup__description");
  }

  open(link, name) {
    super.open();
    this._popupImage.src = link;
    this._popupDescription.textContent = name;
    this._popupDescription.alt = name;
  }
}