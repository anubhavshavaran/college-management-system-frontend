import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://82.29.167.212:3000/api",
    // baseURL: "http://localhost:3000/api",
    timeout: 0,
    headers: {'X-Custom-Header': 'foobar'},
    validateStatus: function () {
        return true;
    }
});

export default axiosInstance;