import { closeByEscape } from "./modal.js";

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

export function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}