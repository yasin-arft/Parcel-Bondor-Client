import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAuth from "@/hooks/useAuth";
import BookingForm from "@/pages/shared/bookingForm/BookingForm";
import { format } from "date-fns";

const BookParcel = () => {
  const { user } = useAuth();

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
    console.log(data);
    console.log(bookingData);
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