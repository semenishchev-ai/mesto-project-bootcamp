export function openPopup(popup) {
    popup.classList.add('popup_opened');
}

export function closePopup(item) {
    item.classList.remove('popup_opened');
}