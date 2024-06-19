import { Button } from '@/components/ui/button';
import Confetti from 'react-confetti'
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from 'react-use';

const PaymentSuccess = () => {
  const { width, height } = useWindowSize();
  const navigate = useNavigate();

  return (
    <section className='flex justify-center items-center h-screen'>
      <Confetti
        width={width}
        height={height}
      />
      <div className='text-center'>
        <h2 className='text-2xl md:text-3xl xl:text-4xl text-green-600 font-semibold'>Your payment has been successful.</h2>
        <Button onClick={() => navigate('/dashboard')} className="bg-red-light hover:bg-red-deep mt-2">Dashboard</Button>
      </div>
    </section>
  );
};

export default PaymentSuccess;