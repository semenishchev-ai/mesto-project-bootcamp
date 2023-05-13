import { checkResponse } from "./utils.js"


const config = {
    baseUrl: 'https://nomoreparties.co/v1/exp-mipt-fbc-1',
    headers: {
        authorization: 'bd0a4522-502b-47b6-9943-4c4f37572342',
        'Content-Type': 'application/json'
    }
}

export const getProfile = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: { authorization: config.headers.authorization }
    }) .then(checkResponse)
}

export const getInitCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: { authorization: config.headers.authorization }
    }) .then(checkResponse)
}

export const postCard = (currentName, currentLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: currentName,
            link: currentLink
        })
    }) .then(checkResponse)
}

export const updateAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    }) .then(checkResponse)
}

export const updatePorfile = (newName, newAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    }) .then(checkResponse)
}

export const putLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'PUT',
        headers: { authorization: config.headers.authorization }
    }) .then(checkResponse)
}

export const deleteLike = (id) => {
    return fetch(`${config.baseUrl}/cards/likes/${id}`, {
        method: 'DELETE',
        headers: { authorization: config.headers.authorization }
    }) .then(checkResponse)
}

export const deleteCard = (card_id) => {
    return fetch(`https://nomoreparties.co/v1/exp-mipt-fbc-1/cards/${card_id}`, {
        method: 'DELETE',
        headers: {
            authorization: 'bd0a4522-502b-47b6-9943-4c4f37572342'
        }
    }) .then(checkResponse)
}