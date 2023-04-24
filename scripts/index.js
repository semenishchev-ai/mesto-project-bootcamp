const editButton = document.querySelector('.profile__edit-button');
const cardElementPopup = document.querySelector('.image-popup');
const cardsPopup = document.querySelector('.card-popup');
const addButton = document.querySelector('.profile__add-button');

const profilePopup = document.querySelector('.profile-popup');
const profileForm = document.querySelector('.profile');
const profileCloseButton = profilePopup.querySelector('.popup__close-icon');
const profilePopupName = profilePopup.querySelector('input[name="name"]');
const profileFormName = profileForm.querySelector('.profile__name');
const profilePopupDescription = profilePopup.querySelector('input[name="description"]');
const profileFormDescription = profileForm.querySelector('.profile__description');
const popupImage = cardElementPopup.querySelector('.popup__image')
const imageCloseButton = cardElementPopup.querySelector('.popup__close-icon');

const inputName = cardsPopup.querySelector('input[name="name"]');
const inputLink = cardsPopup.querySelector('input[name="description"]');
const cardsCloseButton = cardsPopup.querySelector('.popup__close-icon');
const cardsForm = cardsPopup.querySelector('.popup__form');

function openPopup(popup) {
    popup.classList.add('popup_opened');
}

editButton.addEventListener('click', function () {
    profilePopupName.value =
        profileFormName.textContent;
    profilePopupDescription.value =
        profileFormDescription.textContent;
    openPopup(profilePopup);
});

function closePopup(item) {
    item.classList.remove('popup_opened');
}
profileCloseButton.addEventListener('click', function () {
    closePopup(profilePopup)
});

profileForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    profileFormName.textContent = profilePopupName.value;
    profileFormDescription.textContent = profilePopupDescription.value;
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


imageCloseButton.addEventListener('click', function () {
    closePopup(cardElementPopup);
});

function createCard(name, link) {
    const elementItem = document.querySelector('#elements__item').content;
    const cardElement = elementItem.querySelector('.elements__item').cloneNode(true);

    const itemImage = cardElement.querySelector('.elements__image');
    itemImage.src = link;
    itemImage.alt = name;
    itemImage.addEventListener('click', function () {
        openPopup(cardElementPopup);
        popupImage.src = link;
        popupImage.alt = name;

        cardElementPopup.querySelector('.popup__caption').textContent = name;
    });

    cardElement.querySelector('.elements__place').textContent = name;

    setLikeHandler(cardElement.querySelector('.elements__button'));
    setDeleteHandler(cardElement.querySelector('.elements__delete-button'));
    return cardElement;
}


function addCard(name, link, mod) {
    const userItem = createCard(name, link);

    if (mod) {
        sectionElements.append(userItem);
        return;
    }
    sectionElements.prepend(userItem);
}

initialCards.forEach(function (item) {
    addCard(item.name, item.link, true);
});

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

addButton.addEventListener('click', function () {
    openPopup(cardsPopup);
});

cardsCloseButton.addEventListener('click', function () {
    closePopup(cardsPopup)
});

cardsForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    addCard(inputName.value, inputLink.value, false);
    closePopup(cardsPopup);
    evt.target.reset();
});

