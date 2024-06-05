import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import BookingForm from "@/pages/shared/bookingForm/BookingForm";
import { format } from "date-fns";
import Swal from "sweetalert2";

const BookParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const defaultValues = {
    name: user?.displayName,
    email: user?.email,
    phone: '',
    type: '',
    weight: '',
    price: 0,
    receiverName: '',
    receiverPhone: '',
    deliveryAddress: '',
    requestedDeliveryDate: new Date(),
    deliveryLatitude: '',
    deliveryLongitude: ''
  }

  const handleBooking = async (data) => {
    const bookingData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      type: data.type,
      weight: parseFloat(data.weight),
      price: parseInt(data.price),
      receiverName: data.receiverName,
      receiverPhone: data.receiverPhone,
      deliveryAddress: data.deliveryAddress,
      requestedDeliveryDate: format(new Date(data.requestedDeliveryDate), "dd/MM/yyyy"),
      deliveryLatitude: parseFloat(data.deliveryLatitude),
      deliveryLongitude: parseFloat(data.deliveryLongitude),
      status: 'pending',
    }

    const res = await axiosSecure.post('/bookings', bookingData);
    if (res.data.insertedId) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your booking has done!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  return (
    <section>
      <SectionHeading>Book a parcel</SectionHeading>
      <div className="p-4 max-w-2xl mx-auto">
        <BookingForm defaultValues={defaultValues} submitHandler={handleBooking} />
      </div>
    </section>
  );
};

export default BookParcel;