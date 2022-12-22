import { initialCards } from "../utils/initialCards.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import './index.css';

const buttonEdit = document.querySelector(".profile__btn-edit"); // Кнопка открытия формы редактирования профиля
const formPopupProfile = document.forms["edit-profile"]; // Попап-форма профиля
const nameInput = formPopupProfile.querySelector(".popup__input_type_name"); // Введение имени в форме попапа
const infoInput = formPopupProfile.querySelector(".popup__input_type_description"); // Введение описания, работы в форме попапа
const profileName = document.querySelector(".profile__name"); // Поле имени
const profileAbout = document.querySelector(".profile__about"); // Поле описания
const formElementPopupPlace = document.forms["add-place"]; // Попап-форма новой карточки места
const buttonAddPic = document.querySelector(".profile__btn-add"); // Кнопка добавления карточки с плюсиком на сайте
const cardTemplate = "#template"; // Селектор шаблона карточек
const cardList = document.querySelector(".cards__list"); // Список карточек

// Список параметров для валидации форм
const validateConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__btn-save",
  inactiveButtonClass: "popup__btn-save_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__form-error_active",
};

// Создание экземпляров 2-х форм и валидация
const profileValidation = new FormValidator(validateConfig, formPopupProfile);
const newCardValidation = new FormValidator(
  validateConfig,
  formElementPopupPlace
);
profileValidation.enableValidation();
newCardValidation.enableValidation();

const popupProfile = new PopupWithForm(".popup_profile", handleProfileSubmitForm);
const popupPlace = new PopupWithForm(".popup_place", handlePlaceSubmitForm);

popupProfile.setEventListeners();
popupPlace.setEventListeners();

function handlePlaceSubmitForm(data) {
  cardsList.addItem(createCard(data));
  popupPlace.close();
}

const userProfile = new UserInfo({profileName, profileAbout});

function handleProfileSubmitForm(profileData) {
  userProfile.setUserInfo(profileData);
  popupProfile.close();
}


// Метод открытия изображения в большое
function openImage(link, name) {
  popupWithImage.open(link, name);
}
const popupWithImage = new PopupWithImage(".popup_picture");
popupWithImage.setEventListeners();

// Метод создания разметки карточки
function createCard(item) {
  const newCard = new Card(item, cardTemplate, openImage);
  const card = newCard.createCard();
  return card;
}

const cardsList = new Section(
  {
    items: initialCards.reverse(),
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  cardList
);

cardsList.rendererItems();

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