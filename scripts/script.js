let openProfileForm = document.querySelector(".profile__btn-edit");      // Кнопка редактирования профиля
let saveProfile = document.querySelector(".popup__btn-save");            // Кнопка сохранения профиля в попапе
let nameProfile = document.querySelector(".profile__name");              // Имя рядом с аватаркой
let infoProfile = document.querySelector(".profile__about");             // Описание, работа под именем
let modal = document.querySelector(".popup");                            // Попап
let form = document.querySelector(".popup__form");                       // Попап-форма редактирования профиля
let nameInput = document.querySelector(".popup__input_type_name");            // Введение имени в форме попапа
let infoInput = document.querySelector(".popup__input_type_description");     // Введение описания, работы в форме попапа
let closeProfileForm = document.querySelector(".popup__btn-close");      // Кнопка-крестик закрытия формы-попап редактирования профиля

// Метод открытия формы редактирования
function openProfile() {
  modal.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;
}

// Метод закрытия формы редактирования
function closeProfile() {
  modal.classList.remove("popup_opened");
}

// Метод сохранения данных в форме
function formSubmitHandler(event) {
  event.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;

  closeProfile();
}

// Cлушатели событий открытия-закрытия формы редактирования профиля и сохранения
  openProfileForm.addEventListener('click', openProfile);
  closeProfileForm.addEventListener('click', closeProfile);
  form.addEventListener('submit', formSubmitHandler); 