import axios from "axios";

const api = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
    timeout: 5000,
    headers: {
        "Content-Type": "application/json"
    }
});

// Global response error handling
api.interceptors.response.use(
    response => response,

    error => {
        if (error.response) {
            console.error(
                `API Error ${error.response.status}:`,
                error.response.data
            );
        } else if (error.request) {
            console.error("Network Error: No response received.");
        } else {
            console.error("Request Error:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;