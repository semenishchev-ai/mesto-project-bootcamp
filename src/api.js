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
    })
}

export const getInitCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: { authorization: config.headers.authorization }
    })
}

export const postCard = (currentName, currentLink) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: currentName,
            link: currentLink
        })
    })
}

export const updateAvatar = (url) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: url
        })
    })
}

export const updatePorfile = (newName, newAbout) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: newName,
            about: newAbout
        })
    })
}