import { LOGIN, LOGOUT } from './actionTypes';

export const login = (payload) => {
    return {
        type: LOGIN,
        name: payload.name,
        password: payload.password
    };
};

export const logout = () => {
    return {
        type: LOGOUT
    };
};

