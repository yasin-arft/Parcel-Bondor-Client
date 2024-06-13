import SectionHeading from "@/components/sectionHeading/SectionHeading";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AllDeliveryMen = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['all deliverymen', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/deliveryman');
      return res.data;
    }
  });

  if (loading || isLoading) return

  return (
    <section>
      <SectionHeading>All delivery men</SectionHeading>

      <div>
        <Table>
          <TableCaption>A list of all delivery men.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Delivery men&#39;s Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="text-center">Total Parcel Delivered</TableHead>
              <TableHead className="text-center">Average Rating</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phoneNumber || 'N/A'}</TableCell>
                  <TableCell className="text-center">{item.totalDelivered}</TableCell>
                  <TableCell className="text-center">{item.averageRatings || 'No ratings yet'}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AllDeliveryMen;