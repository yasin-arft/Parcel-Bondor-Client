import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import SectionHeading from "@/components/sectionHeading/SectionHeading";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import useAxiosPublic from "@/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";

const TopDeliveryMen = () => {
  const axiosPublic = useAxiosPublic();

  const { data, isLoading } = useQuery({
    queryKey: ['top three deliverymen'],
    queryFn: async () => {
      const res = await axiosPublic.get('/topThreeDeliverymen');

      return res.data;
    }
  });

  if (isLoading) return

  return (
    <section className="lg:my-16 md:my-12 my-6">
      <SectionHeading>Top Delivery Men</SectionHeading>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {
          data.map(item => (
            <Card key={item._id}>
              <CardHeader>
                <Avatar className="size-14">
                  <AvatarImage src={item.image} />
                  <AvatarFallback>{item.name}</AvatarFallback>
                </Avatar>
                <CardTitle>{item.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <p> Parcel Delivered: {item.totalDelivered} </p>
                <p> Ratings: {item.averageRatings || 'No Ratings'} </p>
              </CardContent>
            </Card>
          ))
        }
      </div>
    </section>
  );
};

export default TopDeliveryMen;