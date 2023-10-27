import axios from "axios";

const apiURL = import.meta.env.VITE_API_BASE_URL

const axiosApi = axios.create({
    baseURL: apiURL,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosApi