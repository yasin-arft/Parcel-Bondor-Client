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
import { MdEdit, MdRateReview, MdPayment, MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


const MyParcels = () => {
  const navigate = useNavigate();
  const { bookingsData, isBookingLoading, bookingRefetch } = useMyBooking();
  const axiosSecure = useAxiosSecure();

  if (isBookingLoading) return

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
        console.log(res);
        if (res.data.deletedCount) {
          Swal.fire({
            title: "Canceled!",
            text: "Your booking has been canceled.",
            icon: "success"
          });
          bookingRefetch();
        }
      }
    });
  }

  console.log(bookingsData);

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
                  <TableCell>{item.requestedDeliveryDate}</TableCell>
                  <TableCell className="text-center">{item.approxDeliveryDate || '--'}</TableCell>
                  <TableCell>{item.bookingDate}</TableCell>
                  <TableCell className="text-center">{item.DeliveryManID || '--'}</TableCell>
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
                    <Button
                      variant="outline"
                      disabled={item.status !== 'delivered'}
                    >
                      <MdRateReview />
                    </Button>
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