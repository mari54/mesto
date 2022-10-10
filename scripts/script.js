let openProfileForm = document.querySelector(".profile__btn-edit");
let saveProfile = document.querySelector(".popup__btn-save");
let nameProfile = document.querySelector(".profile__name");
let infoProfile = document.querySelector(".profile__about");
let modal = document.querySelector(".popup");
let form = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_name");
let infoInput = document.querySelector(".popup__input_description");
let closeProfileForm = document.querySelector(".popup__btn-close");

// Метод открытия формы редактирования
function openProfile() {
  modal.classList.add("popup_opened");
  nameInput.value = nameProfile.textContent;
  infoInput.value = infoProfile.textContent;
}

  openProfileForm.addEventListener('click', openProfile);

// Метод закрытия формы редактирования
function closeProfile() {
  modal.classList.remove("popup_opened");
}

  closeProfileForm.addEventListener('click', closeProfile);

// Метод сохранения данных в форме
function formSubmitHandler(a) {
  a.preventDefault();
  nameProfile.textContent = nameInput.value;
  infoProfile.textContent = infoInput.value;

  saveProfile.addEventListener('click', closeProfile);
}

  form.addEventListener('submit', formSubmitHandler); 