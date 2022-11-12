// функция, показывающая ошибку при заполнении формы.
const showInputError = (form, input, errorMessage, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.errorClass);
};

// Функция, удаляющая ошибку, если все правильно
const hideInputError = (form, input, config) => {
  const errorElement = form.querySelector(`.${input.id}-error`);

  input.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
};

// Функция, проверяющая валидность поля
const isValid = (form, input, config) => {
  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

// Функция проверки валидности полей формы 
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
  return !input.validity.valid;
  })
};

// Функция переключения кнопки на неактивную 
const toggleButtonState = (inputList, button, config) => {
  if (hasInvalidInput(inputList)) {
    button.setAttribute('disabled', '');
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.removeAttribute('disabled', '');
    button.classList.remove(config.inactiveButtonClass);
  }
};

// Функция, добавляющая обработчик всем полям формы
const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const saveButton = form.querySelector(config.submitButtonSelector);
  
  inputList.forEach(function(input){
    input.addEventListener('input', () => {
      isValid(form, input, config)
      toggleButtonState(inputList, saveButton, config); // каждому полю вешаем переключатель кнопки на неактивную
    });
  });
}

// Функция добавления обработчиков всем формам
const enableValidation = (config) => { 
  const formList = Array.from(document.querySelectorAll(config.formSelector));
    
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
};

// Передаём через config функциям то, что им нужно будет взять в объекте
enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__btn-save',
  inactiveButtonClass: 'popup__btn-save_inactive',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__form-error_active'
});