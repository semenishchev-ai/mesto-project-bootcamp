import {
    popupForm, cardsForm, profileInputs, cardsInputs, cardsPopup, profileName,
    profilePopupName, profileDescription, profilePopupDescription, profilePopup,
    inputName, inputLink
} from '../index.js';
import { closePopup } from './utils.js';
import { addCard } from './card.js';

const showInputError = (formElement, inputElement, errorMessage, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(obj.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(obj.inputErrorClass);
    errorElement.classList.remove(obj.errorClass);
    errorElement.textContent = '';
};

export const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.setAttribute("disabled", "disabled");
    } else {
        buttonElement.removeAttribute("disabled", "disabled");
    }
};

export const checkInputValidity = (formElement, inputElement, obj) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, obj);
    } else {
        hideInputError(formElement, inputElement, obj);
    }
};

const setEventListeners = (formElement, obj) => {
    const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));

    const buttonElement = formElement.querySelector(obj.submitButtonSelector);

    toggleButtonState(inputList, buttonElement);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, obj);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

function submitPopup(popup, evt) {
    if (popup.classList[1] === 'card-popup') {
        addCard(inputName.value, inputLink.value, false);
        closePopup(popup);
        evt.target.reset();
    }
    if (popup.classList[1] === 'profile-popup') {
        profileName.textContent = profilePopupName.value;
        profileDescription.textContent = profilePopupDescription.value;
        closePopup(popup);
    }
}

export const enableValidation = (obj) => {
    const formList = Array.from(document.querySelectorAll(obj.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
            submitPopup(formElement.closest('.popup'), evt);
        });
        setEventListeners(formElement, obj);
    });
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};