import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://j8a604.p.ssafy.io:8080",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access-token");
    const newConfig = config;
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
