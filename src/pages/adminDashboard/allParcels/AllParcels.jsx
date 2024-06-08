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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ManageParcelForm from "./ManageParcelForm";

const AllParcels = () => {
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['bookings'],
    queryFn: async () => {
      const res = await axiosSecure.get('/bookings');
      return res.data
    }
  });

  if (isLoading) return

  return (
    <section>
      <SectionHeading>All Parcels</SectionHeading>

      <div>
        <Table>
          <TableCaption>A list of all parcels.</TableCaption>
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
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                        >
                          <BsThreeDots />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="absolute top-0 right-0">
                        <ManageParcelForm parcelId={item._id} refetchAllParcel={refetch} />
                      </PopoverContent>
                    </Popover>
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