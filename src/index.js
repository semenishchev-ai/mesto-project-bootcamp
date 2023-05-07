import './index.css';
import * as data from './components/validate.js';
import { closePopup, openPopup } from './components/utils';
import {addCard} from './components/card.js';
import { escClosing } from './components/modal';

export const cardElementPopup = document.querySelector('.image-popup');
export const cardsPopup = document.querySelector('.card-popup');
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');

export const profilePopup = document.querySelector('.profile-popup');
export const popupForm = profilePopup.querySelector('.popup__form');
export const profilePopupName = profilePopup.querySelector('input[name="name"]');
export const profileForm = document.querySelector('.profile');
export const profileName = profileForm.querySelector('.profile__name');
export const profilePopupDescription = profilePopup.querySelector('input[name="description"]');
export const profileDescription = profileForm.querySelector('.profile__description');
export const popupImage = cardElementPopup.querySelector('.popup__image')
const profileCloseButton = profilePopup.querySelector('.popup__close-icon');
const imageCloseButton = cardElementPopup.querySelector('.popup__close-icon');
export const sectionElements = document.querySelector('.elements');

export const inputName = cardsPopup.querySelector('input[name="name"]');
export const inputLink = cardsPopup.querySelector('input[name="description"]');
const cardsCloseButton = cardsPopup.querySelector('.popup__close-icon');
export const cardsForm = cardsPopup.querySelector('.popup__form');

const popups = Array.from(document.querySelectorAll('.popup'));
export const profileInputs = Array.from(popupForm.querySelectorAll('.popup__input'));
export const cardsInputs = Array.from(cardsForm.querySelectorAll('.popup__input'));
const profileSubmitButton = popupForm.querySelector('.popup__button');

const overlays = Array.from(document.querySelectorAll('.popup__overlay'));

overlays.forEach((overlay) => {
    overlay.addEventListener('click', function () {
        closePopup(overlay.parentElement);
    });
});

//modal

escClosing(popups);

editButton.addEventListener('click', function () {
    profilePopupName.value =
        profileName.textContent;
    profilePopupDescription.value =
        profileDescription.textContent;
    profileInputs.forEach((inputElement) => {
        data.checkInputValidity(popupForm, inputElement);
        data.toggleButtonState(profileInputs, profileSubmitButton);
    });
    openPopup(profilePopup);
});

profileCloseButton.addEventListener('click', function () {
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

imageCloseButton.addEventListener('click', function () {
    closePopup(cardElementPopup);
});

initialCards.forEach(function (item) {
    addCard(item.name, item.link, true);
});

addButton.addEventListener('click', function () {
    openPopup(cardsPopup);
});

cardsCloseButton.addEventListener('click', function () {
    closePopup(cardsPopup);
});
//validation
data.enableValidation();
