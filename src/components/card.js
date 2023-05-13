import { sectionElements, cardElementPopup, popupImage, userId } from '../index.js';
import { deleteCard, deleteLike, putLike } from './api.js';
import { closePopup, openPopup } from './utils.js';

const confirmationPopup = document.querySelector('.confirmation-popup');
const confirmButton = confirmationPopup.querySelector('.popup__button');
let cardToDeleteId;

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
        if (user._id == userId) {
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
            deleteLike(id)
                .then(res => {
                    updateLikes(likeCounter, res.likes.length)
                    likeButton.classList.toggle('elements__button_active');
                });
        } else {
            putLike(id)
                .then(res => {
                    updateLikes(likeCounter, res.likes.length)
                    likeButton.classList.toggle('elements__button_active');
                });
        }
    });
}

function setDeleteHandler(deleteButton, id) {
    deleteButton.addEventListener('click', function () {  // удаляется та карточка, которую передаю теперь по id
                                                          // у меня  и до этого всё работало, не знаю, почему возникли проблемы с удалением, 
                                                          // но теперь не должно быть
        deleteButton.classList.add('to-delete');
        cardToDeleteId = id;
        openPopup(confirmationPopup);
    });
}

confirmButton.addEventListener('click', () => {
    deleteCard(cardToDeleteId)
        .then(() => {
            const currentDeleter = document.querySelector('.to-delete');
            currentDeleter.classList.remove('to-delete');
            const listItem = currentDeleter.closest('.elements__item');
            listItem.remove();
            closePopup(document.querySelector('.popup_opened'));
        })
})