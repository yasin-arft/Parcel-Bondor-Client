import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useMyBooking from "@/hooks/useMyBooking";
import BookingForm from "@/pages/shared/bookingForm/BookingForm";
import Swal from "sweetalert2";

const BookParcel = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { bookingRefetch } = useMyBooking();

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
      requestedDeliveryDate: new Date(data.requestedDeliveryDate).toISOString(),
      deliveryLatitude: parseFloat(data.deliveryLatitude),
      deliveryLongitude: parseFloat(data.deliveryLongitude),
      status: 'pending',
      bookingDate: new Date().toISOString()
    }

    const res = await axiosSecure.post('/bookings', bookingData);
    if (res.data.insertedId) {
      bookingRefetch();
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
        <BookingForm
          defaultValues={defaultValues}
          submitHandler={handleBooking}
          buttonText="Book Now" />
      </div>
    </section>
  );
};

export default BookParcel;