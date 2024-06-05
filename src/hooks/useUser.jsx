import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: userData, refetch: refetchUser } = useQuery({
    queryKey: ['user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user?.email}`);
      return res.data
    }
  })

  return { userData, refetchUser };
};

export default useUser;