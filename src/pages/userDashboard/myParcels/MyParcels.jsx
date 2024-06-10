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
import useMyBooking from "@/hooks/useMyBooking";
import { dateFormat } from "@/utils/formatDate";
import { MdEdit, MdRateReview, MdPayment, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import GiveReviewForm from "./GiveReviewForm";


const MyParcels = () => {
  const navigate = useNavigate();
  const { bookingsData, isBookingLoading, bookingRefetch } = useMyBooking();
  const axiosSecure = useAxiosSecure();

  if (isBookingLoading) return
// console.log(bookingsData[0]._id);
  const handleCancelBooking = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
      cancelButtonText: 'No'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.delete(`bookings/${id}`);
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Cancelled!",
            text: "Your booking has been cancelled.",
            icon: "success"
          });
          bookingRefetch();
        }
      }
    });
  };

  return (
    <section>
      <SectionHeading>My parcels</SectionHeading>

      <div>
        <Table>
          <TableCaption>A list of your parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
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
              bookingsData.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>
                    {
                      dateFormat(item.bookingDate)
                    }
                  </TableCell>
                  <TableCell className="text-center">
                    {
                      item.approxDeliveryDate ?
                        dateFormat(item.approxDeliveryDate) : '--'
                    }
                  </TableCell>
                  <TableCell>
                    {
                      dateFormat(item.requestedDeliveryDate)
                    }
                  </TableCell>
                  <TableCell className="text-center max-w-5 break-words">{item.deliveryManId || '--'}</TableCell>
                  <TableCell className="first-letter:uppercase">{item.status}</TableCell>
                  <TableCell className="text-center text-xl">
                    <Button
                      onClick={() => navigate(`/dashboard/update_parcel/${item._id}`)}
                      variant="outline"
                      disabled={item.status !== 'pending'}
                    >
                      <MdEdit />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center text-xl">
                    <Button
                      onClick={() => handleCancelBooking(item._id)}
                      variant="outline"
                      disabled={item.status !== 'pending'}
                    >
                      <MdDelete />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center text-xl">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          disabled={item.status !== 'Delivered'}
                        >
                          <MdRateReview />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="mr-4">
                        <GiveReviewForm deliveryManId={item.deliveryManId} bookingId={item._id} />
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="text-center text-xl">
                    <Button
                      variant="outline"
                    >
                      <MdPayment />
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

export default MyParcels;