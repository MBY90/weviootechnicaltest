import axios from 'axios';
const API_KEY=process.env.REACT_APP_API_KEY
export const API = axios.create({
    baseURL: `https://dummyapi.io/data/v1/`,
    headers: { 'app-id': API_KEY }
});