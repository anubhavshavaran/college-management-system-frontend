import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://college-management-system-backend-xa5z.onrender.com/api",
    timeout: 0,
    headers: {'X-Custom-Header': 'foobar'},
    validateStatus: function () {
        return true;
    }
});

export default axiosInstance;