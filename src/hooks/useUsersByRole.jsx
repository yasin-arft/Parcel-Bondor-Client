import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useUsersByRole = (roleType) => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['user', roleType],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?role=${roleType}`);
      return res.data;
    }
  });

  return { data, refetch, isLoading }
};

export default useUsersByRole;