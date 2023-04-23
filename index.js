const editButton = document.querySelector('.profile__edit-button');
const profilePopup = document.querySelector('.profile-popup');
const profile = document.querySelector('.profile');
const closeButton = profilePopup.querySelector('.popup__close-icon');
const submitButton = profilePopup.querySelector('.popup__button');

editButton.addEventListener('click', function () {
    profilePopup.querySelector('input[name="name"]').value =
        profile.querySelector('.profile__name').textContent;
    profilePopup.querySelector('input[name="description"]').value =
        profile.querySelector('.profile__description').textContent;
    profilePopup.classList.add('popup_opened');
});

function closePopup(item) {
    item.classList.remove('popup_opened');
}
closeButton.addEventListener('click', function () {
    closePopup(profilePopup)
});

submitButton.addEventListener('click', function (event) {
    event.preventDefault();
    profile.querySelector('.profile__name').textContent = profilePopup.querySelector('input[name="name"]').value;
    profile.querySelector('.profile__description').textContent = profilePopup.querySelector('input[name="description"]').value;
    closePopup(profilePopup);
});

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

const sectionElements = document.querySelector('.elements');
const sectionPage = document.querySelector('.page');

function addCard(name, link, mod) {
    const elementItem = document.querySelector('#elements__item').content;
    const userItem = elementItem.querySelector('.elements__item').cloneNode(true);
    const elementPopup = document.querySelector('#image-popup').content;
    const userItemPopup = elementPopup.querySelector('.image-popup').cloneNode(true);

    let itemImage = userItem.querySelector('.elements__image');
    itemImage.src = link;
    itemImage.alt = name;
    itemImage.addEventListener('click', function () {
        userItemPopup.classList.add('popup_opened');
    });

    userItem.querySelector('.elements__place').textContent = name;

    likeEvent(userItem.querySelector('.elements__button'));
    deleteEvent(userItem.querySelector('.elements__delete-button'));

    let popupImage = userItemPopup.querySelector('.image-popup__image')
    popupImage.src = link;
    popupImage.alt = name;

    userItemPopup.querySelector('.image-popup__caption').textContent = name;

    const imageCloseButton = userItemPopup.querySelector('.image-popup__close-button');
    imageCloseButton.addEventListener('click', function () {
        closePopup(userItemPopup);
    });

    sectionPage.append(userItemPopup);
    if (mod) {
        sectionElements.append(userItem);
        return;
    }
    sectionElements.prepend(userItem);
}

initialCards.forEach(function (item) {
    addCard(item.name, item.link, true);
});

function likeEvent(likeButton) {
    likeButton.addEventListener('click', function () {
        likeButton.classList.toggle('elements__button_active');
    });
}

function deleteEvent(deleteButton) {
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.elements__item');
        listItem.remove();
    });
}

const cardsPopup = document.querySelector('.card-popup');
const addButton = document.querySelector('.profile__add-button');
const closeButton2 = cardsPopup.querySelector('.popup__close-icon');
const submitButton2 = cardsPopup.querySelector('.popup__button');

addButton.addEventListener('click', function () {
    cardsPopup.classList.add('popup_opened');
});

closeButton2.addEventListener('click', function () {
    closePopup(cardsPopup)
});

submitButton2.addEventListener('click', function (event) {
    event.preventDefault();
    const inputName = cardsPopup.querySelector('input[name="name"]').value;
    const inputLink = cardsPopup.querySelector('input[name="description"]').value;
    addCard(inputName, inputLink, false);
    closePopup(cardsPopup);
});

