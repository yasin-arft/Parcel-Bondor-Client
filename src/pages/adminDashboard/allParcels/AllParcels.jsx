import SectionHeading from "@/components/sectionHeading/SectionHeading";
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
import { dateFormat } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";

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

      <div>
        <Table>
          <TableCaption>A list of your parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>User&#39;s Name</TableHead>
              <TableHead>User&#39;s Phone</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead>Req. Delivery Date</TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {
                      dateFormat(item.bookingDate)
                    }
                  </TableCell>
                  <TableCell>
                    {
                      dateFormat(item.requestedDeliveryDate)
                    }
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="first-letter:uppercase">{item.status}</TableCell>
                  <TableCell className="text-center text-xl">
                    <Button
                      variant="outline"
                    >
                      <BsThreeDots />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>

      </div>
    </section>
  );
};

export default AllParcels;