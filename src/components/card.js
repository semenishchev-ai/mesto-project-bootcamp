import { sectionElements, cardElementPopup, popupImage } from '../index.js';
import { closePopup, openPopup } from './utils.js';

const confirmationPopup = document.querySelector('.confirmation-popup');
const confirmButton = confirmationPopup.querySelector('.popup__button');

function createCard(item, isMy) {
    const elementItem = document.querySelector('#elements__item').content;
    const cardElement = elementItem.querySelector('.elements__item').cloneNode(true);
    const cardCaption = cardElementPopup.querySelector('.popup__caption');
    const cardPlace = cardElement.querySelector('.elements__place');
    const itemImage = cardElement.querySelector('.elements__image');
    const likesCounter = cardElement.querySelector('.elements__counter');
    const likeButton = cardElement.querySelector('.elements__button');
    itemImage.src = item.link;
    itemImage.alt = item.name;
    itemImage.addEventListener('click', function () {
        openPopup(cardElementPopup);
        popupImage.src = item.link;
        popupImage.alt = item.name;

        cardCaption.textContent = item.name;
    });

    cardPlace.textContent = item.name;
    item.likes.forEach((user) => {
        if (user._id == "b2364691aa0aca61f977c54e") {
            likeButton.classList.add('elements__button_active');
        }
    })
    likesCounter.textContent = item.likes.length;
    setLikeHandler(likeButton, item._id);
    if (isMy) {
        setDeleteHandler(cardElement.querySelector('.elements__delete-button'), item._id);
    } else {
        const deleteButton = cardElement.querySelector('.elements__delete-button');
        deleteButton.classList.add('elements__delete-button_inactive');
    }
    return cardElement;
}

export const addCard = (item, mod, isMy) => {
    const userItem = createCard(item, isMy);

    if (mod) {
        sectionElements.append(userItem);
        return;
    }
    sectionElements.prepend(userItem);
}

function updateLikes(counter, count) {
    counter.textContent = count;
}

function setLikeHandler(likeButton, id) {
    likeButton.addEventListener('click', function () {
        const likeCounter = likeButton.nextElementSibling;
        if (likeButton.classList.length == 2) {
            fetch(`https://nomoreparties.co/v1/exp-mipt-fbc-1/cards/likes/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: 'bd0a4522-502b-47b6-9943-4c4f37572342'
                }
            })
                .then(res => res.json())
                .then(res => updateLikes(likeCounter, res.likes.length));
        } else {
            fetch(`https://nomoreparties.co/v1/exp-mipt-fbc-1/cards/likes/${id}`, {
                method: 'PUT',
                headers: {
                    authorization: 'bd0a4522-502b-47b6-9943-4c4f37572342'
                }
            })
                .then(res => res.json())
                .then(res => updateLikes(likeCounter, res.likes.length));
        }
        likeButton.classList.toggle('elements__button_active');
    });
}

function setDeleteHandler(deleteButton, id) {
    deleteButton.addEventListener('click', function () {
        deleteButton.classList.add('to-delete');
        deleteButton.classList.add(`${id}`); //добавлено, чтобы потом найти в eventListener ниже
        openPopup(confirmationPopup);
    });
}

confirmButton.addEventListener('click', () => {
    const currentDeleter = document.querySelector('.to-delete');
    currentDeleter.classList.remove('to-delete');
    fetch(`https://nomoreparties.co/v1/exp-mipt-fbc-1/cards/${currentDeleter.classList[1]}`, {
        method: 'DELETE',
        headers: {
            authorization: 'bd0a4522-502b-47b6-9943-4c4f37572342'
        }
    })
    const listItem = currentDeleter.closest('.elements__item');
    listItem.remove();
    closePopup(document.querySelector('.popup_opened'));
})