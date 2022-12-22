export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._buttonClose = this._popup.querySelector(".popup__btn-close");
  }

  open() {
    document.addEventListener("keydown", this._handleEscClose);
    this._popup.classList.add("popup_opened");
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("mousedown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.close();
      }
    });

    this._buttonClose.addEventListener("click", () => {
      this.close();
    });
  }
}