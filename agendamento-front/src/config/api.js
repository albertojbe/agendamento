import axios from "axios";

const BASE_URL = 'http://localhost:3000/'

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('authToken')}`
    },
    withCredentials: true
});

api.defaults.withCredentials = true;

export { api, BASE_URL};