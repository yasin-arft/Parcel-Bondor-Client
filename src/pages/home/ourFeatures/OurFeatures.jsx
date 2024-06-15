import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import deliveryVan from '../../../assets/image/deliveryVan.png';
import lock from '../../../assets/image/lock.png';
import tracking from '../../../assets/image/tracking.png';
import SectionHeading from "@/components/sectionHeading/SectionHeading";
import CountUp from 'react-countup';
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "@/hooks/useAxiosPublic";


const OurFeatures = () => {
  const axiosPublic = useAxiosPublic();
  const { data, isLoading } = useQuery({
    queryKey: ['home stats'],
    queryFn: async () => {
      const res = await axiosPublic.get('/homeStats');
      return res.data;
    }
  });

  return (
    <section className="lg:my-16 md:my-12 my-6">
      <SectionHeading>Our Features</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        <Card>
          <CardHeader>
            <figure>
              <img src={deliveryVan} alt="Delivery van" className="w-14" />
            </figure>
            <CardTitle>Super Fast Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Get your parcels delivered in record time with our efficient and reliable delivery system.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <figure>
              <img src={lock} alt="Delivery van" className="w-14" />
            </figure>
            <CardTitle>Parcel Safety</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Your parcels are in safe hands. We ensure maximum security and care for every delivery.
            </CardDescription>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <figure>
              <img src={tracking} alt="Delivery van" className="w-14" />
            </figure>
            <CardTitle>Real-Time Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription>
              Track your parcels in real-time with our user-friendly tracking system, keeping you updated at every step.
            </CardDescription>
          </CardContent>
        </Card>
      </div>
      {
        isLoading ||
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-4 md:mt-6 md:w-4/5 mx-auto text-center">
          <Card>
            <CardHeader>
              <CardTitle>Total Bookings</CardTitle>
            </CardHeader>
            <CardContent className='text-3xl md:text-4xl lg:text-5xl font-bold'>
              <CountUp
                end={data.totalBookings}
                duration={2.5}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Deliveries</CardTitle>
            </CardHeader>
            <CardContent className='text-3xl md:text-4xl lg:text-5xl font-bold'>
              <CountUp
                end={data.totalDelivered}
                duration={2.5}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent className='text-3xl md:text-4xl lg:text-5xl font-bold'>
              <CountUp
                end={data.totalUsers}
                duration={2.5}
              />
            </CardContent>
          </Card>
        </div>
      }
    </section>
  );
};

export default OurFeatures;