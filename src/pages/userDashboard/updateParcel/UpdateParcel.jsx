import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import useMyBooking from "@/hooks/useMyBooking";
import BookingForm from "@/pages/shared/bookingForm/BookingForm";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

const UpdateParcel = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();
  const { bookingRefetch } = useMyBooking();

  const { data: loadedData, refetch, isLoading } = useQuery({
    queryKey: ['booking', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/${id}`);
      return res.data;
    }
  });

  if (isLoading) return;

  const defaultValues = {
    name: loadedData.name,
    email: loadedData.email,
    phone: loadedData.phone,
    type: loadedData.type,
    weight: loadedData.weight.toString(),
    price: loadedData.price,
    receiverName: loadedData.receiverName,
    receiverPhone: loadedData.receiverPhone,
    deliveryAddress: loadedData.deliveryAddress,
    requestedDeliveryDate: new Date(loadedData.requestedDeliveryDate),
    deliveryLatitude: loadedData.deliveryLatitude.toString(),
    deliveryLongitude: loadedData.deliveryLongitude.toString()
  }

  const handleUpdateBooking = async (data) => {

    const updatedBookingData = {
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
    }

    const res = await axiosSecure.patch(`/bookings/${id}`, updatedBookingData);

    if (res.data.modifiedCount) {
      bookingRefetch();
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your booking updated successfully!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  return (
    <section>
      <SectionHeading>Update parcel</SectionHeading>
      <div className="p-4 max-w-2xl mx-auto">
        <BookingForm
          defaultValues={defaultValues}
          submitHandler={handleUpdateBooking}
          buttonText="Update"
        />
      </div>
    </section>
  );
};

export default UpdateParcel;