import axios, { AxiosResponse } from "axios";

export const HTTP = axios.create({
    baseURL: process.env.BASE_URL,
    withCredentials: true
});

const onFulfilled = (response: AxiosResponse) => response;
const onRejected = (error: AxiosResponse) => {
    return Promise.reject(error)
}

HTTP.interceptors.response.use(onFulfilled, onRejected)