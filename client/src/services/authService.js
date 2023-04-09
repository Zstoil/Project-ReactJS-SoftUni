import * as requester from './requester';
import { baseUrl } from '../utils/baseUrl';

const url = `${baseUrl}/users`;


export const login = (data) => requester.post(`${url}/login`, data);

export const register = (data) => requester.post(`${url}/register`, data);

export const logout = () => requester.get(`${url}/logout`);