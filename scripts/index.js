import { initialCards } from "./initialCards.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const popupProfile = document.querySelector('.popup_profile');                             // Секция редактирования профиля
const buttonEdit = document.querySelector('.profile__btn-edit');                           // Кнопка открытия формы редактирования профиля
const formPopupProfile = document.forms['edit-profile'];                                   // Попап-форма профиля
const nameInput = formPopupProfile.querySelector('.popup__input_type_name');               // Введение имени в форме попапа
const infoInput = formPopupProfile.querySelector('.popup__input_type_description');        // Введение описания, работы в форме попапа
const nameProfile = document.querySelector('.profile__name');                              // Поле имени
const infoProfile = document.querySelector('.profile__about');                             // Поле описания
const popupPlace = document.querySelector('.popup_place');                                 // Секция нового места
const formElementPopupPlace = document.forms['add-place'];                                 // Попап-форма новой карточки места
const buttonAddPic = document.querySelector('.profile__btn-add');                          // Кнопка добавления карточки с плюсиком на сайте
const placeInput = formElementPopupPlace.querySelector('.popup__input_type_place');        // Введение названия места в форме добавления места
const linkInput = formElementPopupPlace.querySelector('.popup__input_type_link');          // Введение ссылки на картинку в форме добавления места
const popupPic = document.querySelector('.popup_picture');                                 // Секция всплывания картинки
const popupPicImg = document.querySelector('.popup__image');                               // Картинка, всплывающая в большую при нажатии
const cardTemplate = '#template';                                                          // Селектор шаблона карточек
const cardsList = document.querySelector('.cards__list');                                  // Список карточек
const popupPicDescription = document.querySelector('.popup__description');                 // Описание картинок при всплывании

// Список параметров для валидации форм
const validateConfig = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-error_active',
};

// Создание экземпляров 2-х форм и валидация
const profileValidation = new FormValidator(validateConfig, formPopupProfile);
const newCardValidation = new FormValidator(validateConfig, formElementPopupPlace);
profileValidation.enableValidation();
newCardValidation.enableValidation(); 

// Метод открытия формы-попапа
function openPopup(popup) {
  popup.classList.add('popup_opened');
  popup.addEventListener('mousedown', closeByOverlay);
  document.addEventListener('keydown', closeByEscape);
}

// Метод закрытия формы-попапа
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  item.removeEventListener('mousedown', closeByOverlay);
}

// Закрытие форм-попапов кнопкой
const closeButtons = document.querySelectorAll('.popup__btn-close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

// Закрытие форм-попапов кликом на оверлей
const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    const popup = evt.target;
    closePopup(popup);
  }
};

// Закрытие форм-попапов нажатием на Escape
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}

// Функция редактирования профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;

  closePopup(popupProfile);
}

// Функция заполнения формы "Редактирования профиля"
function createForm() {
  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;
}

// Метод открытия изображения в большое
function openImage (link, name) {
  popupPicImg.src = link;
  popupPicDescription.textContent = name;
  popupPicImg.alt = name;
  openPopup(popupPic);
}

// Метод создания разметки карточки
function createCard(item) {
  const newCard = new Card(item, cardTemplate, openImage);
  const card = newCard.createCard();
  return card;
}

function addCard(cardList, card) {
  cardList.prepend(card);
}

// Шесть карточек «из коробки»
initialCards.forEach((item) => {
  const card = createCard(item);
  addCard(cardsList, card);
});

// Метод создания карточки
function handlePopupPlaceFormSubmit(evt) {
  evt.preventDefault();
  const values = {
    name: placeInput.value,
    link: linkInput.value,
  };
  cardsList.prepend(createCard(values));
  formElementPopupPlace.reset();
  closePopup(popupPlace);
}

// Cлушатели событий
formPopupProfile.addEventListener('submit', handleProfileFormSubmit);
buttonAddPic.addEventListener('click', () => {
  newCardValidation.resetValidation();
  openPopup(popupPlace)
});

formElementPopupPlace.addEventListener('submit', handlePopupPlaceFormSubmit);
buttonEdit.addEventListener('click', () => {
  createForm();
  openPopup(popupProfile);
  profileValidation.resetValidation();
});