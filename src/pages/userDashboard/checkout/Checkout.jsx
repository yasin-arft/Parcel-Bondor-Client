import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
import { useState } from "react";

const stripePromise = loadStripe(import.meta.env.VITE_payment_PK);

const Checkout = () => {
  const [paymentError, setPaymentError] = useState('');
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { data, isLoading } = useQuery({
    queryKey: ['booking checkout', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/booking/${id}`);
      return res.data;
    }
  });

  if (isLoading) return

  return (
    <section>
      <SectionHeading>Checkout</SectionHeading>
      <div className="max-w-xl mx-auto p-4">
        <h2 className="text-2xl font-medium">Your bill is : {data.price}tk</h2>
        <Elements stripe={stripePromise}>
          <CheckoutForm setPaymentError={setPaymentError} price={data.price} />
        </Elements>
        <p className="text-red-600 mt-2">{paymentError}</p>
      </div>
    </section>
  );
};

export default Checkout;