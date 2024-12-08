import api from './api'
import store from './store'

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

export const logOut = () => {
    return api()
        .post("/logout")
        .then((response) => {
            return response;
        });
};

export const checkAuthentication = () => {
    const lsToken = localStorage.getItem("token");
    if (lsToken) {
        store.state.isAuthenticated = true
    }  
};