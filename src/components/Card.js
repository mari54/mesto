export default class Card {
  constructor(
    item,
    templateSelector,
    handleCardClick,
    handleAddLike,
    handleDeleteLike,
    handleDeleteCard,
    userId
  ) {
    this._name = item.name;
    this._imageLink = item.link;
    this._likes = item.likes;
    this._userId = userId;
    this._ownerId = item.owner._id;
    this._cardId = item._id;
    this._templateSelector = templateSelector;
    this._openImage = handleCardClick;
    this._handleAddLike = handleAddLike;
    this._handleDeleteLike = handleDeleteLike;
    this._handleDeleteCard = handleDeleteCard;
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
    this._likeCount = this._newCard.querySelector(".card__like-count");

    this._cardImg.src = this._imageLink;
    this._cardImg.alt = this._name;
    this._cardTitle.textContent = this._name;
    this._likeCount.textContent = `${this._likes.length}`;

    this._setEventListeners();
    this._handleLike();
    this._isOwner();

    return this._newCard;
  }

  setLikes(object) {
    this._likeCount.textContent = `${object.likes.length}`;
  }

  _handleLike() {
    this._likes.forEach((like) => {
      if (this._userId === like._id) {
        this.addLike();
      } else {
        this.deleteLike();
      }
    });
  }

  // Удаление карточки
  handleRemoveCard() {
    this._newCard.remove();
    this._newCard = null;
  }

  // Установка лайка
  addLike() {
    this._likeBtn.classList.add("card__like-button_active");
  }

  // Установка лайка
  deleteLike() {
    this._likeBtn.classList.remove("card__like-button_active");
  }

  _isOwner() {
    if (this._ownerId !== this._userId) {
      this._newCard.querySelector(".card__remove-button").remove();
    }
  }

  // Установка слушателей
  _setEventListeners() {
    this._likeBtn.addEventListener("click", () => {
      if (this._likeBtn.classList.contains("card__like-button_active")) {
        this._handleDeleteLike();
      } else {
        this._handleAddLike();
      }
    });

    this._removeBtn = this._newCard.querySelector(".card__remove-button");
    this._removeBtn.addEventListener("click", () => {
      this._handleDeleteCard();
    });

    this._newCard
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._openImage(this._imageLink, this._name);
      });
  }
}
