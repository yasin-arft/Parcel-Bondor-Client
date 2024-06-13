import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useMyBooking = (status) => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookingsData, refetch: bookingRefetch, isLoading: isBookingLoading } = useQuery({
    queryKey: ['booking', user?.email, status],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}?status=${status}`);
      return res.data
    }
  });

  return { bookingsData, bookingRefetch, isBookingLoading };
};

export default useMyBooking;