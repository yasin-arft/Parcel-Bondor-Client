import SectionHeading from "@/components/sectionHeading/SectionHeading";
// import useAuth from "@/hooks/useAuth";
import BookingForm from "@/pages/shared/bookingForm/BookingForm";

const BookParcel = () => {
  // const { user } = useAuth();

  // const defaultValues = {
  //   name: user?.displayName,
  //   email: user?.email,
  // }

  const handleBooking = async (data) => {
    console.log( data);
  }

  return (
    <section>
      <SectionHeading>Book a parcel</SectionHeading>
      <div className="p-4 max-w-2xl mx-auto">
        <BookingForm submitHandler={handleBooking} />
      </div>
    </section>
  );
};

export default BookParcel;