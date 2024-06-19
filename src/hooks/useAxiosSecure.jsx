import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_server_URL
});

const useAxiosSecure = () => {
  const { logout, setLoading } = useAuth();
  const navigate = useNavigate();

  // request interceptor
  axiosSecure.interceptors.request.use((config) => {
    const token = localStorage.getItem('access-token');
    config.headers.authorization = `Bearer ${token}`;

    return config
  }, (error) => {
    return Promise.reject(error);
  });

  // response interceptor
  axiosSecure.interceptors.response.use((response) => {
    return response;
  }, async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      logout()
        .then(() => {
          setLoading(false);
          navigate('/login');
        })
    }

    return Promise.reject(error);
  });

  return axiosSecure;
};

export default useAxiosSecure;