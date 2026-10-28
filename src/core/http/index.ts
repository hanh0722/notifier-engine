import axios, { AxiosInstance } from "axios";

class Http {
    private static _instance: AxiosInstance;

    public static getInstance() {
        if(!this._instance) {
            this._instance = axios.create();
            return this._instance;
        }
        return this._instance;
    }
}

export default Http;