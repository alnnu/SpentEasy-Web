import axios from "axios";
import { getSession } from "next-auth/react";

const api_url = 'http://localhost:3080/api/v1'


export const api = axios.create({
    baseURL: api_url
})

api.interceptors.request.use(async (request) => {
    const session = await getSession();

    if (session) {
        // @ts-ignore
        const API_TOKEN = session.api_token.jwttoken;

        console.log(API_TOKEN)
        request.headers.Authorization = `Bearer ${API_TOKEN}`;

        // console.log("Request Headers:", request.headers);
    }

    // console.log("Modified Request:", request);

    return request;
});