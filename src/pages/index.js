import Card from "../components/Card.js";
import Section from "../components/Section.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import "./index.css";

const buttonEdit = document.querySelector(".profile__btn-edit"); // Кнопка открытия формы редактирования профиля
const buttonAvatar = document.querySelector(".profile__avatar-edit"); // Кнопка открытия редактирования аватара
const formPopupProfile = document.forms["edit-profile"]; // Попап-форма профиля
const nameInput = formPopupProfile.querySelector(".popup__input_type_name"); // Введение имени в форме попапа
const infoInput = formPopupProfile.querySelector(".popup__input_type_description"); // Введение описания, работы в форме попапа
const profileName = document.querySelector(".profile__name"); // Поле имени
const profileAbout = document.querySelector(".profile__about"); // Поле описания
const profileAvatar = document.querySelector(".profile__avatar"); // Профайл аватара
const formElementPopupPlace = document.forms["add-place"]; // Попап-форма новой карточки места
const formAvatarPopup = document.forms["avatar"]; // Попап-форма изменения Аватара
const buttonAddPic = document.querySelector(".profile__btn-add"); // Кнопка добавления карточки с плюсиком на сайте
const cardTemplate = "#template"; // Селектор шаблона карточек
const cardList = document.querySelector(".cards__list"); // Список карточек

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-56",
  headers: {
    authorization: "bf2cf826-fde2-404a-975b-9140a627987e",
    "Content-Type": "application/json",
  },
});

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then((value) => {
    userId = value[0]._id;
    userProfile.setUserInfo(value[0]);
    cardsList.rendererItems(value[1]);
  })
  .catch((error) => console.log(error));

// Список параметров для валидации форм
const validateConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-save",
  inactiveButtonClass: "popup__btn-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-error_active",
};

// Создание экземпляров 3-х форм (редактирования профиля, аватара и добавления карточки) и валидация
const profileValidation = new FormValidator(validateConfig, formPopupProfile);
const newCardValidation = new FormValidator(validateConfig, formElementPopupPlace);
const newAvatarValidation = new FormValidator(validateConfig, formAvatarPopup);
profileValidation.enableValidation();
newCardValidation.enableValidation();
newAvatarValidation.enableValidation();

const popupProfile = new PopupWithForm(".popup_profile", handleProfileSubmitForm);
const popupPlace = new PopupWithForm(".popup_place", handlePlaceSubmitForm);
const popupAvatar = new PopupWithForm(".popup_edit-avatar", handleAvatarForm);

popupProfile.setEventListeners();
popupPlace.setEventListeners();
popupAvatar.setEventListeners();

function handlePlaceSubmitForm(data) {
  popupPlace.handleButtonText(true);
  return api.addCards(data).then(res => 
    {
      cardsList.addItem(createCard(res));
      popupPlace.close();
    })
    .catch((error) => console.log(error))
    .finally(() => popupPlace.handleButtonText(false))
}

function handleAvatarForm(data) {
  popupAvatar.handleButtonText(true);
  return api.setAvatar(data).then(res => 
    {
      userProfile.setUserInfo(res);
      popupAvatar.close();
    })
    .catch((error) => console.log(error))
    .finally(() => popupAvatar.handleButtonText(false))
}

const userProfile = new UserInfo({profileName, profileAbout, profileAvatar });

function handleProfileSubmitForm(profileData) {
  popupProfile.handleButtonText(true);
  return api.setProfile(profileData).then(res => 
  {
    userProfile.setUserInfo(res);
    popupProfile.close();
  })
  .catch((error) => console.log(error))
  .finally(() => popupProfile.handleButtonText(false))
}

// Метод открытия изображения в большое
function openImage(link, name) {
  popupWithImage.open(link, name);
}
const popupWithImage = new PopupWithImage(".popup_picture");
popupWithImage.setEventListeners();

function handleAddLike(card, object) {
  return api.addLike(object).then(res =>
    {
      card.setLikes(res);
      card.addLike();
    })
    .catch((error) => console.log(error));
}

function handleDeleteLike(card, object) {
  return api.deleteLike(object).then(res =>
    {
      card.setLikes(res);
      card.deleteLike();
    })
    .catch((error) => console.log(error));
}

const cardsList = new Section(
  {
    renderer: (item) => {
    cardsList.addItem(createCard(item));
    },
  },
  cardList
);

// Метод удаления своих карточек 
const popupConfirm = new PopupWithConfirmation({
  popupSelector: ".popup_you-sure",

  removeCardForSure: (card) => {
    api.deleteCards(card._cardId)
      .then(() => {
        card.handleRemoveCard();
        popupConfirm.close();
      })
      .catch((error) => console.log(error));
  }
});
popupConfirm.setEventListeners();

// Метод создания разметки карточки
function createCard(item) {
  const newCard = new Card(item, cardTemplate, openImage, () => handleAddLike(newCard, item), () => handleDeleteLike(newCard, item), () => popupConfirm.open(newCard), userId);
  const card = newCard.createCard();
  return card;
}

// Cлушатели событий
buttonAddPic.addEventListener("click", () => {
  newCardValidation.resetValidation();
  popupPlace.open();
});

buttonEdit.addEventListener("click", () => {
  const userProfileData = userProfile.getUserInfo();
  nameInput.value = userProfileData.name;
  infoInput.value = userProfileData.about;
  profileValidation.resetValidation();
  popupProfile.open();
});

buttonAvatar.addEventListener("click", () => {
  newAvatarValidation.resetValidation();
  popupAvatar.open();
});
