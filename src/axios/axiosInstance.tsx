import axios, {AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig} from "axios";


const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    // baseURL: "http://localhost:8000/v1/ems/api",
    timeout: 5000,
    // headers: {
    //     'Content-Type': 'application/json',
    // }
});

let refreshRequest: Promise<string> | null = null;

axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig)=>{
    const token = localStorage.getItem("token");
    if(token){
    config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
})

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError<{code?: string}>) => {
    const originalRequest = error.config as (InternalAxiosRequestConfig & {_retry?: boolean}) | undefined;
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data?.code === "TOKEN_EXPIRED" &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/refresh")
    ) {
      originalRequest._retry = true;

      try {
        if(!refreshRequest){
          const storedRefreshToken = localStorage.getItem("refreshToken");
          if(!storedRefreshToken){
            throw new Error("No refresh token available");
          }

          refreshRequest = axiosInstance.post("/refresh", {refreshToken: storedRefreshToken})
            .then((response) => {
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              return response.data.token as string;
            })
            .finally(() => {
              refreshRequest = null;
            });
        }

        const token = await refreshRequest;
        originalRequest.headers.set("Authorization", `Bearer ${token}`);
        return axiosInstance(originalRequest);
      } catch(refreshError) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("role");
        localStorage.removeItem("userData");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;