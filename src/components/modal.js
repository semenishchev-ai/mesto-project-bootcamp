export const escClosing = (popups) => {
    popups.forEach((popup) => {
        document.addEventListener('keydown', (evt) => {
            if (evt.key === "Escape") {
                closePopup(popup);
            }
        });
    })
}