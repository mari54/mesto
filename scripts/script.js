const initialCards = [
  {
    name: 'Карачаевск',
    link: './images/places-karachaevsk.jpg'
  },
  {
    name: 'Гора Эльбрус',
    link: './images/places-elbrus.jpg'
  },
  {
    name: 'Домбай',
    link: './images/places-dombai.jpg'
  },
  {
    name: 'Байкал',
    link: './images/places-baikal.jpg'
  },
  {
    name: 'Архангельск',
    link: './images/places-arkhangelsk.jpg'
  },
  {
    name: 'Санкт-Петербург',
    link: './images/places-spb.jpg'
  }
];

const popupProfile = document.querySelector('.popup_profile');                        // Форма-попап редактирования профиля
const buttonClose = popupProfile.querySelector('.popup__btn-close');                  // Кнопка-крестик закрытия формы
const buttonEdit = document.querySelector('.profile__btn-edit');                      // Кнопка открытия формы редактирования профиля
const formPopupProfile = popupProfile.querySelector('.popup__form');                  // Попап-форма профиля
const nameInput = formPopupProfile.querySelector(".popup__input_type_name");                  // Введение имени в форме попапа
const infoInput = formPopupProfile.querySelector(".popup__input_type_description");           // Введение описания, работы в форме попапа
const nameProfile = document.querySelector('.profile__name');                         // Поле имени
const infoProfile = document.querySelector('.profile__about');                        // Поле описания
const closeProfileForm = document.querySelector(".popup__btn-close");                 // Кнопка-крестик закрытия формы-попап редактирования профиля
const cards = document.querySelector('.cards');                                       // Секция карточек
const popupPlace = document.querySelector('.popup_place');                            // Секция шаблона нового места
const buttonClosePopupPlace = popupPlace.querySelector('.popup__btn-close');          // Кнопка закрытия попапа добавления новой карточки места
const formElementPopupPlace = popupPlace.querySelector('.popup__form');               // Попап-форма новой карточки места
const buttonAddPic = document.querySelector('.profile__btn-add');                     // Кнопка добавления карточки
const placeInput = formElementPopupPlace.querySelector('.popup__input_type_place');   // Введение названия места в форме добавления места
const linkInput = formElementPopupPlace.querySelector('.popup__input_type_link');     // Введение ссылки на картинку в форме добавления места
const popupPic = document.querySelector('.popup_picture');                            // Секция всплывания картинки
const popupPicImg = document.querySelector('.popup__image');                          // Картинка, всплывающая в большую при нажатии
const buttonClosePopupPic = popupPic.querySelector('.popup__btn-close');              // Кнопка закрытия большой картинки
const cardTemplate = document.querySelector('#template');                             // Шаблон карточек
const cardsList = document.querySelector('.cards__list');                             // Список карточек
const popupPicDescription = document.querySelector('.popup__description');            // Описание картинок при всплывании


// Метод открытия формы редактирования
function openPopup(item) {
  item.classList.add('popup_opened');
  item.addEventListener('click', closeByOverlay);
  document.addEventListener('keydown', closeByEscape);
}

// Метод закрытия формы редактирования
function closePopup(item) {
  item.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
  item.removeEventListener('click', closeByOverlay);
}

// Закрытие форм-попапа кнопкой
const closeButtons = document.querySelectorAll('.popup__btn-close');
closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup));
});

const closeByOverlay = (evt) => {
  if (evt.target.classList.contains('popup_opened')) {
    const popup = evt.target;
    closePopup(popup);
  }
}

// Метод сохранения данных в форме редактирования
function formSubmitHandler(event) {
  event.preventDefault();

  const nameValue = nameInput.value;
  const infoValue = infoInput.value;

  nameProfile.textContent = nameValue;
  infoProfile.textContent = infoValue;

  closePopup(popupProfile);
}

// Cлушатели событий
formPopupProfile.addEventListener('submit', formSubmitHandler);
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

    newCard.querySelector('.card__like-button').addEventListener('click', function (evt) {
      const button = evt.target;
      button.classList.toggle('card__like-button_active');
    });
  
    newCard.querySelector('.card__remove-button').addEventListener('click', function (evt) {
      newCard.remove();
    });
    return newCard;
  }

 // Шесть карточек «из коробки»
  initialCards.forEach(item => {
    cardsList.prepend(createCard(item));
  });

const buttonSubmitPopupPlace = formElementPopupPlace.querySelector('.popup__btn-save');

// Метод создания карточки
function handlePopupPlaceFormSubmit(evt) {
  evt.preventDefault();
  const values = {
    name: placeInput.value,
    link: linkInput.value,
  };
  cardsList.prepend(createCard(values));
  formElementPopupPlace.reset();
  buttonSubmitPopupPlace.classList.add('popup__btn-save_inactive');
  buttonSubmitPopupPlace.setAttribute('disabled', true);
  closePopup(popupPlace);
}
formElementPopupPlace.addEventListener('submit', handlePopupPlaceFormSubmit);

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const activePopup = document.querySelector('.popup_opened');
    closePopup(activePopup);
  }
}