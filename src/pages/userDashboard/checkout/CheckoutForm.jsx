import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';

const CheckoutForm = ({ setPaymentError, price }) => {
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {

    axiosSecure.post("/create-payment-intent", { price })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });

  }, [axiosSecure, price]);

  // checkout handler
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card === null) return;

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setPaymentError(error.message)
    } else {
      console.log('payment method', paymentMethod);
      setPaymentError('')
    }

  }

  return (
    <form onSubmit={handleCheckout} className="space-y-3 mt-3">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      <Button
        type="submit"
        disabled={!stripe || !clientSecret}
        className='bg-red-light text-white hover:bg-red-deep  disabled:bg-gray-500'
      >
        Pay
      </Button>
    </form>
  );
};

CheckoutForm.propTypes = {
  setPaymentError: PropTypes.func,
  price: PropTypes.number
};

export default CheckoutForm;