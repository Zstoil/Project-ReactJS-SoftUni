import *as request from './requester';

const baseURL = `http://localhost:3030/users`

export const login = (data) => request.post(`${baseURL}/login`, data);

export const register = (data) => request.post(`${baseURL}/register`, data);

export const logout = () => request.get(`${baseURL}/logout`);