import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";


const AllParcels = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data
    }
  });

  if (isLoading) return
  
  console.log(data);

  return (
    <section>
      <SectionHeading>All Parcels</SectionHeading>
    </section>
  );
};

export default AllParcels;