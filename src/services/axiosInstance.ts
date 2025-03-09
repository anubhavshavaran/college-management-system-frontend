import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "https://cms.abdulkalaminstitutions.in/api",
    timeout: 0,
    headers: {'X-Custom-Header': 'foobar'},
    validateStatus: function () {
        return true;
    }
});

export default axiosInstance;