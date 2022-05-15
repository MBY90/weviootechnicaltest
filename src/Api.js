import axios from 'axios';
//get api key from env in real world app this key must be hide in back-end side
//create axios instance of base URL and fill its header config
const API_KEY=process.env.REACT_APP_API_KEY
export const API = axios.create({
    baseURL: `https://dummyapi.io/data/v1/`,
    headers: { 'app-id': API_KEY }
});