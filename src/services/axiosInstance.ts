import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:5000",
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'},
    validateStatus: function () {
        return true;
    }
});

export default axiosInstance;