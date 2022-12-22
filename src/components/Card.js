export class Card {
  constructor(item, templateSelector, handleCardClick) {
    this._name = item.name;
    this._imageLink = item.link;
    this._templateSelector = templateSelector;
    this._openImage = handleCardClick;
  }

  // Получаем разметку
  _getTemplate() {
    return document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  // Наполнение карточки
  createCard() {
    this._newCard = this._getTemplate();

    this._cardImg = this._newCard.querySelector(".card__image");
    this._cardTitle = this._newCard.querySelector(".card__title");
    this._likeBtn = this._newCard.querySelector(".card__like-button");

    this._cardImg.src = this._imageLink;
    this._cardImg.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._newCard;
  }

  // Удаление карточки
  _handleRemoveCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  // Установка лайка
  _handleLikeCard() {
    this._likeBtn.classList.toggle("card__like-button_active");
  }

  // Установка слушателей
  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      this._handleLikeCard();
    });

    this._removeBtn = this._newCard.querySelector(".card__remove-button");
    this._removeBtn.addEventListener("click", () => {
      this._handleRemoveCard();
    });

    this._newCard.querySelector(".card__image").addEventListener("click", () => {
        this._openImage(this._imageLink, this._name);
    });
  }
}