import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:3000/api",
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'},
    validateStatus: function () {
        return true;
    }
});

export default axiosInstance;