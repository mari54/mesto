const popupProfile = document.querySelector('.popup_profile');                         // Форма-попап редактирования профиля
const profileCloseButton = popupProfile.querySelector('.popup__btn-close');            // Кнопка-крестик закрытия формы редактирования профиля
const buttonEdit = document.querySelector('.profile__btn-edit');                       // Кнопка открытия формы редактирования профиля
const formPopupProfile = document.forms['edit-profile'];                               // Попап-форма профиля
const nameInput = formPopupProfile.querySelector('.popup__input_type_name');           // Введение имени в форме попапа
const infoInput = formPopupProfile.querySelector('.popup__input_type_description');    // Введение описания, работы в форме попапа
const nameProfile = document.querySelector('.profile__name');                          // Поле имени
const infoProfile = document.querySelector('.profile__about');                         // Поле описания
const popupPlace = document.querySelector('.popup_place');                             // Секция шаблона нового места
const buttonClosePopupPlace = popupPlace.querySelector('.popup__btn-close');           // Кнопка закрытия попапа добавления новой карточки места
const formElementPopupPlace = document.forms['add-place'];                             // Попап-форма новой карточки места
const buttonAddPic = document.querySelector('.profile__btn-add');                      // Кнопка добавления карточки
const placeInput = formElementPopupPlace.querySelector('.popup__input_type_place');    // Введение названия места в форме добавления места
const linkInput = formElementPopupPlace.querySelector('.popup__input_type_link');      // Введение ссылки на картинку в форме добавления места
const popupPic = document.querySelector('.popup_picture');                             // Секция всплывания картинки
const popupPicImg = document.querySelector('.popup__image');                           // Картинка, всплывающая в большую при нажатии
const buttonClosePopupPic = popupPic.querySelector('.popup__btn-close');               // Кнопка закрытия большой картинки
const cardTemplate = document.querySelector('#template');                              // Шаблон карточек
const cardsList = document.querySelector('.cards__list');                              // Список карточек
const popupPicDescription = document.querySelector('.popup__description');             // Описание картинок при всплывании

// Метод открытия формы-попапа
function openPopup(item) {
  item.classList.add('popup_opened');
  item.addEventListener('mousedown', closeByOverlay);
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

// Метод сохранения данных в форме редактирования
function handleProfileFormSubmit(event) {
  event.preventDefault();

  const nameValue = nameInput.value;
  const infoValue = infoInput.value;

  nameProfile.textContent = nameValue;
  infoProfile.textContent = infoValue;

  closePopup(popupProfile);
}

// Cлушатели событий
formPopupProfile.addEventListener('submit', handleProfileFormSubmit);
buttonEdit.addEventListener('click', () => openPopup(popupProfile));
buttonAddPic.addEventListener('click', () => openPopup(popupPlace));

// Метод создания карточки
function createCard(item) {
  const newCard = cardTemplate.content.querySelector('.card').cloneNode(true);
  const cardImg = newCard.querySelector('.card__image');
  cardImg.src = item.link;
  cardImg.alt = item.name;
  newCard.querySelector('.card__title').textContent = item.name;

  cardImg.addEventListener('click', function (evt) {
    const picture = evt.target;
    popupPicImg.src = picture.src;
    popupPicDescription.textContent = picture.alt;
    popupPicImg.alt = picture.alt;
    openPopup(popupPic);
  });

  newCard
    .querySelector('.card__like-button')
    .addEventListener('click', function (evt) {
      const button = evt.target;
      button.classList.toggle('card__like-button_active');
    });

  newCard
    .querySelector('.card__remove-button')
    .addEventListener('click', function (evt) {
      newCard.remove();
    });
  return newCard;
}

// Шесть карточек «из коробки»
initialCards.forEach((item) => {
  cardsList.prepend(createCard(item));
});

const buttonSubmitPopupPlace =
  formElementPopupPlace.querySelector('.popup__btn-save');

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
  buttonSubmitPopupPlace.setAttribute('disabled', '');
  buttonSubmitPopupPlace.classList.add('popup__btn-save_inactive');
}
formElementPopupPlace.addEventListener('submit', handlePopupPlaceFormSubmit);