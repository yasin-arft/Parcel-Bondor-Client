import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: bookingsData, isLoading } = useQuery({
    queryKey: ['booking', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/${user?.email}`);
      return res.data
    }
  });

  if (isLoading) return

  // const { _id, type, requestedDeliveryDate, status } = bookingsData;
  console.log(bookingsData);

  return (
    <section>
      <SectionHeading>My parcels</SectionHeading>

      <div>
        <Table>
          <TableCaption>A list of your parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Req. Delivery Date</TableHead>
              <TableHead>Approx. Delivery Date</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Delivery Man ID</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update</TableHead>
              <TableHead>Cancel</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Pay</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              bookingsData.map(item => (
                <TableRow key={item._id}>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.requestedDeliveryDate}</TableCell>
                  <TableCell>{item.approxDeliveryDate || '--'}</TableCell>
                  <TableCell>{item.bookingDate || '--'}</TableCell>
                  <TableCell>id</TableCell>
                  <TableCell>{item.status}</TableCell>
                  <TableCell>Update</TableCell>
                  <TableCell>Cancel</TableCell>
                  <TableCell>Review</TableCell>
                  <TableCell>Pay</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

      </div>
    </section>
  );
};

export default MyParcels;