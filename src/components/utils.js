import { closeByEscape } from "./modal.js";

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', closeByEscape);
}

export function closePopup(item) {
    item.classList.remove('popup_opened');
    document.removeEventListener('keydown', closeByEscape);
}

export function checkResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
}
