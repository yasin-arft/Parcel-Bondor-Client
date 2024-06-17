import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const Checkout = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['booking checkout', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/${id}`);
      return res.data;
    }
  });

  if (isLoading) return

  return (
    <section>
      <SectionHeading>Checkout</SectionHeading>
      <h2 className="text-2xl font-medium">Your bill is : {data.price}tk</h2>
    </section>
  );
};

export default Checkout;