import { sectionElements, cardElementPopup, popupImage } from '../index.js';
import { openPopup } from './utils.js';

function createCard(name, link) {
    const elementItem = document.querySelector('#elements__item').content;
    const cardElement = elementItem.querySelector('.elements__item').cloneNode(true);
    const cardCaption = cardElementPopup.querySelector('.popup__caption');
    const cardPlace = cardElement.querySelector('.elements__place');
    const itemImage = cardElement.querySelector('.elements__image');
    itemImage.src = link;
    itemImage.alt = name;
    itemImage.addEventListener('click', function () {
        openPopup(cardElementPopup);
        popupImage.src = link;
        popupImage.alt = name;

        cardCaption.textContent = name;
    });

    cardPlace.textContent = name;

    setLikeHandler(cardElement.querySelector('.elements__button'));
    setDeleteHandler(cardElement.querySelector('.elements__delete-button'));
    return cardElement;
}


export const addCard = (name, link, mod) => {
    const userItem = createCard(name, link);

    if (mod) {
        sectionElements.append(userItem);
        return;
    }
    sectionElements.prepend(userItem);
}

function setLikeHandler(likeButton) {
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('elements__button_active');
    });
}

function setDeleteHandler(deleteButton) {
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.elements__item');
        listItem.remove();
    });
}
