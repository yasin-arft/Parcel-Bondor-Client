import axios from "axios";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL
});

const useAxiosSecure = () => {

  // request interceptor
  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    config.headers.authorization = `Bearer ${token}`;

    return config
  }, (error) => {
    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;