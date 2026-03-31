import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:7276/api",
});

//aqui é onde o front se conecta com o backend