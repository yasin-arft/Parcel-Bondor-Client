import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ setPaymentError, price }) => {
  const { user } = useAuth();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {

    axiosSecure.post("/create-payment-intent", { price })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });

  }, [axiosSecure, price]);

  // checkout handler
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (card === null) return;

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card
    });

    if (error) {
      setPaymentError(error.message)
    } else {
      setPaymentError('')
    }

    setLoading(true);

    // confirm payment 
    const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: card,
        billing_details: {
          name: user?.displayName || 'Unknown',
          email: user?.email || 'Unknown'
        }
      }
    });

    if (confirmError) {
      toast.error('Error! Try again')
    } else {
      if (paymentIntent.status === "succeeded") {
        navigate('/payment_success');
      }
    }

    setLoading(false);
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
        disabled={!stripe || !elements || !clientSecret || loading}
        className='bg-red-light text-white hover:bg-red-deep  disabled:bg-gray-500'
      >
        {
          loading ?
            'Processing...' :
            'Pay'
        }
      </Button>
    </form>
  );
};

CheckoutForm.propTypes = {
  setPaymentError: PropTypes.func,
  price: PropTypes.number
};

export default CheckoutForm;