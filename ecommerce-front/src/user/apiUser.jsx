import { API } from '../config';

// fetch products based on arrival or most sell for homepage
export const readUser = (userID, token) => {
    return fetch(`${API}/user/${userID}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const updateUser = (userID, token, user) => {
    return fetch(`${API}/user/${userID}`, {
            method: "PUT",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(user)
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
};

export const updateUserLocal = (user, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(user));
        next();
    }
}

export const fetchOrders = (userID, token) => {
    return fetch(`${API}/user/orders/all/${userID}`, {
            method: "GET",
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            return res.json();
        })
        .catch(err => console.log(err));
}