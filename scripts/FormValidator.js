export class FormValidator {
  constructor(config, formElement) {
    this._form = formElement;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  // Функция, показывающая ошибку при заполнении формы.
  _showInputError = (input, errorMessage) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);

    input.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  };

  // Функция, удаляющая ошибку, если все правильно
  _hideInputError = (input) => {
    const errorElement = this._form.querySelector(`.${input.id}-error`);

    input.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  };

  // Функция, проверяющая валидность поля
  _isValid = (input) => {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  };

  // Функция проверки валидности полей формы
  _hasInvalidInput = () => {
    return this._inputList.some((input) => {
      return !input.validity.valid;
    });
  };

  // Функция отключения кнопки
  disableActiveButtonClass() {
    this._buttonElement.setAttribute("disabled", "");
    this._buttonElement.classList.add(this._inactiveButtonClass);
  }

  // Функция включения кнопки
  enableActiveButtonClass() {
    this._buttonElement.removeAttribute("disabled", "");
    this._buttonElement.classList.remove(this._inactiveButtonClass);
  }

  // Функция переключения кнопки на неактивную
  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableActiveButtonClass();
    } else {
      this.enableActiveButtonClass();
    }
  };

  resetValidation() {
    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement)
    });
  }

  // Функция, добавляющая обработчик всем полям формы
  _setEventListeners = () => {
    this._toggleButtonState(); // деактивируем кнопку при первичном открывании формы

    this._inputList.forEach((input) => {
      input.addEventListener("input", () => {
        this._isValid(input);
        this._toggleButtonState(); // каждому полю вешаем переключатель кнопки на неактивную
      });
    });
  };

  // Публичный метод добавления обработчиков всем формам
  enableValidation = () => {
    this._setEventListeners();
  };
}
