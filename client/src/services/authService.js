import *as request from './requester';

const baseURL = `http://localhost:3030/users`

export const login = (loginData) => request.post(`${baseURL}/login`, loginData);