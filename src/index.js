import './index.css';
import * as data from './components/validate.js';
import { closePopup, openPopup } from './components/utils';
import { addCard } from './components/card.js';
import { getInitCards, getProfile, postCard, updateAvatar, updatePorfile } from './api.js';

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
const profileImage = profile.querySelector('.profile__avatar');
const profileAvatar = profile.querySelector('.profile__edit-overlay');
const avatarPopup = document.querySelector('.avatar-popup');
const avatarForm = avatarPopup.querySelector('.popup__form');
const avatarLink = avatarForm.querySelector('.popup__input');
const avatarSubmitButton = avatarPopup.querySelector('.popup__button');

export const inputName = cardsPopup.querySelector('input[name="name"]');
export const inputLink = cardsPopup.querySelector('input[name="description"]');
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

const loadingTexts = {
    "save": ["Сохранить", "Сохранение..."],
    "create": ["Создать", "Создание..."]
}

function renderLoading(isLoading, elem, type) {
    if (isLoading) {
        elem.textContent = loadingTexts[type][1];
    } else {
        elem.textContent = loadingTexts[type][0];
    }
}

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

profileForm.addEventListener('submit', () => {
    profileName.textContent = profilePopupName.value;
    profileDescription.textContent = profilePopupDescription.value;
    renderLoading(true, avatarSubmitButton, "save");
    updatePorfile(profilePopupName.value, profilePopupDescription.value)
        .finally(() => renderLoading(false, avatarSubmitButton, "save"))
        .catch((err) => {
            console.log(err);
        });
    closePopup(profilePopup);
});

profileAvatar.addEventListener('click', () => {
    openPopup(avatarPopup);
})

avatarForm.addEventListener('submit', () => {
    profileImage.src = avatarLink.value;
    renderLoading(true, profileSubmitButton, "save");
    updateAvatar(avatarLink.value)
        .finally(() => renderLoading(false, profileSubmitButton, "save"))
        .catch((err) => {
            console.log(err);
        });
    closePopup(avatarPopup);
})


//cards
function makeCards(cardsArray) {
    cardsArray.forEach(function (item) {
        if (item.owner._id == "b2364691aa0aca61f977c54e") {
            addCard(item, true, true);
        } else {
            addCard(item, true, false);
        }
    });
}

getInitCards()
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => makeCards(res))
    .catch((err) => {
        console.log(err);
    });

addButton.addEventListener('click', function () {
    cardsSubmitButton.setAttribute("disabled", "disabled");
    openPopup(cardsPopup);
});

cardsForm.addEventListener('submit', function (evt) {
    const currentName = inputName.value;
    const currentLink = inputLink.value;
    renderLoading(true, cardsSubmitButton, "create");
    postCard(currentName, currentLink)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Ошибка: ${res.status}`);
        })
        .then(res => addCard({ name: currentName, link: currentLink, _id: res._id, likes: res.likes }, false, true))
        .finally(() => renderLoading(false, cardsSubmitButton, "create"))
        .catch((err) => {
            console.log(err);
        });
    closePopup(cardsPopup);
    evt.target.reset();
});

//validation
data.enableValidation(validationParameters);

//server
const assignProfile = (obj) => {
    profileName.textContent = obj.name;
    profileDescription.textContent = obj.about;
    profileImage.src = obj.avatar;
}

getProfile()
    .then(res => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
    })
    .then(res => assignProfile(res))
    .catch((err) => {
        console.log(err);
    });

