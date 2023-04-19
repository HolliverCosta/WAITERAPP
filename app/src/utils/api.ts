import axios from "axios";

export const baseUrl = "http://192.168.49.2:30080";

export const paymentBaseUrl = "http://192.168.49.2:30081/";


export const api = axios.create({
    baseURL: baseUrl,
});

export const apiPayment = axios.create({
    baseURL: paymentBaseUrl,
});
