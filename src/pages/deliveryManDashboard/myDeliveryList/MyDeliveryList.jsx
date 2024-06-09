import SectionHeading from "@/components/sectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { dateFormat } from "@/utils/formatDate";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { BsThreeDots } from "react-icons/bs";
import ManageDeliveryActions from "./ManageDeliveryActions";

const MyDeliveryList = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings/deliveryman/${id}`);
      return res.data
    }
  })

  if (isLoading) return

  // console.log(id);
  console.log(data[0]);

  return (
    <section>
      <SectionHeading>My delivery list</SectionHeading>

      <div>
        <Table>
          <TableCaption>A list of parcels assigned to me.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Booked User&#39;s Name</TableHead>
              <TableHead>Receiver&#39;s Name</TableHead>
              <TableHead>Booked User&#39;s Phone</TableHead>
              <TableHead>Req. Delivery Date</TableHead>
              <TableHead>Approx. Delivery Date</TableHead>
              <TableHead>Receiver&#39;s Phone</TableHead>
              <TableHead>Receiver&#39;s Address</TableHead>
              <TableHead className="text-center">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.receiverName}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>{dateFormat(item.requestedDeliveryDate)}</TableCell>
                  <TableCell>{dateFormat(item.approxDeliveryDate)}</TableCell>
                  <TableCell>{item.receiverPhone}</TableCell>
                  <TableCell>{item.deliveryAddress}</TableCell>
                  <TableCell className="text-center">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                        >
                          <BsThreeDots />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="mr-4">
                        <ManageDeliveryActions parcelId={item._id} refetchMyList={refetch} />
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

export default MyDeliveryList;