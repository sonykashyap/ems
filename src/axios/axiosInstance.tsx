import axios, {AxiosRequestConfig} from "axios";


const axiosInstance = axios.create({
    // baseURL: import.meta.env.VITE_API_BASE_URL,
    baseURL: "http://localhost:8000/v1/ems/api",
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

axiosInstance.interceptors.request.use((config: AxiosRequestConfig)=>{
    const token = localStorage.getItem("token");
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


export default axiosInstance;