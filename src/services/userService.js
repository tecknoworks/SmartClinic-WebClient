const BASE_SERVICE_URL = "http://localhost:8080/auth"

export const userService = {
    login,
    logout,
    register
}

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({ username, password })
    };
    return fetch(`${BASE_SERVICE_URL}/user/login`, requestOptions)
        .then(response => response.json())
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    return fetch(`${BASE_SERVICE_URL}/user/register`, requestOptions)
        .then(response => response.json)
}

function logout() {
    localStorage.removeItem('user');
}

function getAll() {

}

