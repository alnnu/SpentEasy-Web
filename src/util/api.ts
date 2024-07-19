import axios from "axios";

const api_url = 'http://localhost:3080/api/v1'


export const api = axios.create({
    baseURL: api_url
})