import api from './api'

export const logIn = (email, password) => {
    return api()
        .post("/login", {
            email: email,
            password: password,
        })
        .then((response) => {
            return response;
        });
};