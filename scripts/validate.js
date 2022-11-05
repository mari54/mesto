// функция, показывающая ошибку при заполнении формы.
const showInputError = (form, input, errorMessage) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add('popup__input_type_error');
  errorElement.textContent = errorMessage;
  errorElement.classList.add('popup__form-error_active'); 
};

// Функция, удаляющая ошибку, если все правильно. 
const hideInputError = (form, input) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove('popup__input_type_error');
  errorElement.classList.remove('popup__form-error_active');
  errorElement.textContent = '';
};

// Функция, которая проверяет валидность поля
const isValid = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage);
  } else {
    hideInputError(form, input);
  }
};

// Функция проверки валидности полей формы 
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
  return !input.validity.valid;
  })
};

// Функция переключения кнопки на неактивную 
const toggleButtonState = (inputList, button) => {
  if (hasInvalidInput(inputList)) {
    button.classList.add('popup__btn-save_inactive');
  } else {
    button.classList.remove('popup__btn-save_inactive');
  }
};

// Функция, добавляющая обработчик всем полям формы
const setEventListeners = (form) => {
  const inputList = Array.from(form.querySelectorAll('.popup__input'));
  const saveButton = form.querySelector('.popup__btn-save')
  
  inputList.forEach(function(input){
    input.addEventListener('input', () => {
      isValid(form, input)
      toggleButtonState(inputList, saveButton);
    });
  });
}

// Функция добавления обработчиков всем формам
const enableValidation = () => { 
  const formList = Array.from(document.querySelectorAll('.popup__form'));
    
  formList.forEach((form) => {
    setEventListeners(form);
  });
};

// Включение валидации вызовом enableValidation
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-error_active'
});