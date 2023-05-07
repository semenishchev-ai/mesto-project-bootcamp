import {
    popupForm, cardsForm, profileInputs, cardsInputs, cardsPopup, profileName,
    profilePopupName, profileDescription, profilePopupDescription, profilePopup,
    inputName, inputLink
} from '../index.js';
import { closePopup } from './utils.js';
import { addCard } from './card.js';

const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('popup__input_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('popup__form-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('popup__input_error');
    errorElement.classList.remove('popup__form-error_active');
    errorElement.textContent = '';
};

export const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_inactive');
    } else {
        buttonElement.classList.remove('popup__button_inactive');
    }
};

export const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));

    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

export const enableValidation = () => {
    popupForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (!hasInvalidInput(profileInputs)) {
            profileName.textContent = profilePopupName.value;
            profileDescription.textContent = profilePopupDescription.value;
            closePopup(profilePopup);
        }
    });
    setEventListeners(popupForm);

    cardsForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (!hasInvalidInput(cardsInputs)) {
            addCard(inputName.value, inputLink.value, false);
            closePopup(cardsPopup);
            evt.target.reset();
        }
    });
    setEventListeners(cardsForm);
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};