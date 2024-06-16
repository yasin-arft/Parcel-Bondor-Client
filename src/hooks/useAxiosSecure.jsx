import axios from "axios";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
  // baseURL: import.meta.env.VITE_server_URL
});

const useAxiosSecure = () => {

  return axiosSecure;
};

export default useAxiosSecure;