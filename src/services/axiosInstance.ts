import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://college-management-system-backend-lbsp.onrender.com/api",
    timeout: 5000,
    headers: {'X-Custom-Header': 'foobar'},
    validateStatus: function () {
        return true;
    }
});

export default axiosInstance;