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

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.code === "TOKEN_EXPIRED"
    ) {
      console.warn("Token expired, redirecting to login...");
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;