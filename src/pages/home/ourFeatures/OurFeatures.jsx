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


const OurFeatures = () => {
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
    </section>
  );
};

export default OurFeatures;