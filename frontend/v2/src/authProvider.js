import decodeJwt from 'jwt-decode';

export default {

    login: ({ username, password }) => {
        const request = new Request('http://localhost:8080/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' })
        });
        return fetch(request)
            .then((response) => {
                if (response.status < 200 || response.status >= 300) {
                    return Promise.reject()
                }
                return response.json();
            })
            .then(({ accessToken }) => {
                localStorage.setItem('accessToken', accessToken)
                const decodedToken = decodeJwt(accessToken);
                localStorage.setItem('permissions', decodedToken.user.role)
                return Promise.resolve()
            })
    },
    // called when the user clicks on the logout button
    logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('permissions');
        return Promise.resolve();
    },
    // called when the API returns an error
    checkError: ({ status }) => {
        if (status === 401 || status === 403) {
            localStorage.removeItem('accessToken');
            return Promise.reject();
        }
        return Promise.resolve();
    },
    // called when the user navigates to a new location, to check for authentication
    checkAuth: () => {
        return localStorage.getItem('accessToken')
            ? Promise.resolve()
            : Promise.reject();
    },
    // called when the user navigates to a new location, to check for permissions / roles
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    },
};