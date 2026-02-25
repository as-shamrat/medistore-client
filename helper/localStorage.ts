export function setToken(token: string) {
    localStorage.setItem('token', token)
}

export function getToken() {
    return localStorage.getItem('token')
}

export function removeToken() {
    localStorage.removeItem('token')
}

export function setUserInLocalstorage(user: any) {
    localStorage.setItem('user', JSON.stringify(user))
}
export function getUserFromLocalstorage() {
    const user = localStorage.getItem('user')
    console.log('Getting user from localStorage: ', user)
    return user ? JSON.parse(user) : null
}

export function removeUserFromLocalstorage() {
    localStorage.removeItem('user')
}