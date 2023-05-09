import './index.css';
import * as data from './components/validate.js';
import { closePopup, openPopup } from './components/utils';
import { addCard } from './components/card.js';

export const cardElementPopup = document.querySelector('.image-popup');
export const cardsPopup = document.querySelector('.card-popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

export const profilePopup = document.querySelector('.profile-popup');
export const profileForm = profilePopup.querySelector('.popup__form');
export const profilePopupName = profilePopup.querySelector('input[name="name"]');
export const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
export const profilePopupDescription = profilePopup.querySelector('input[name="description"]');
export const profileDescription = profile.querySelector('.profile__description');
export const popupImage = cardElementPopup.querySelector('.popup__image')
export const sectionElements = document.querySelector('.elements');

export const inputName = cardsPopup.querySelector('input[name="name"]');
export const inputLink = cardsPopup.querySelector('input[name="description"]');
const cardsCloseButton = cardsPopup.querySelector('.popup__close-icon');
export const cardsForm = cardsPopup.querySelector('.popup__form');
const cardsSubmitButton = cardsPopup.querySelector('.popup__button');

export const profileInputs = Array.from(profileForm.querySelectorAll('.popup__input'));
export const cardsInputs = Array.from(cardsForm.querySelectorAll('.popup__input'));
const profileSubmitButton = profileForm.querySelector('.popup__button');

const overlays = Array.from(document.querySelectorAll('.popup__overlay'));

const validationParameters = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inputErrorClass: 'popup__input_error',
    errorClass: 'popup__form-error_active'
};

overlays.forEach((overlay) => {
    overlay.addEventListener('click', function () {
        closePopup(overlay.closest('.popup'));
    });
});

//modal

editButton.addEventListener('click', function () {
    profilePopupName.value =
        profileName.textContent;
    profilePopupDescription.value =
        profileDescription.textContent;
    profileInputs.forEach((inputElement) => {
        data.checkInputValidity(profileForm, inputElement, validationParameters);
        data.toggleButtonState(profileInputs, profileSubmitButton);
    });
    openPopup(profilePopup);
});

const closeButtons = document.querySelectorAll('.popup__close-icon');
closeButtons.forEach((button) => {
    const popup = button.closest('.popup');
    button.addEventListener('click', () => closePopup(popup));
});

cardsForm.addEventListener('submit', function(evt) {
    addCard(inputName.value, inputLink.value, false);
    closePopup(cardsPopup);
    evt.target.reset();
});

profileForm.addEventListener('submit', function() {
    profileName.textContent = profilePopupName.value;
    profileDescription.textContent = profilePopupDescription.value;
    closePopup(profilePopup);
});


//cards

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

initialCards.forEach(function (item) {
    addCard(item.name, item.link, true);
});

addButton.addEventListener('click', function () {
    cardsSubmitButton.setAttribute("disabled", "disabled");
    openPopup(cardsPopup);
});

cardsCloseButton.addEventListener('click', function () {
    closePopup(cardsPopup);
});
//validation
data.enableValidation(validationParameters);
