import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { dateFormat } from "@/utils/formatDate";
import { Rating } from "@smastrom/react-rating";

const MyReviews = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading } = useQuery({
    queryKey: ['reviews', id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${id}`);
      return res.data
    }
  });

  if (isLoading) return

  return (
    <section>
      <SectionHeading>My Reviews</SectionHeading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {
          data.map(item => (
            <Card key={item._id}>
              <CardHeader className="flex flex-row justify-between items-center">
                <div>
                  <CardTitle>{item.reviewerName}</CardTitle>
                  <CardDescription>{dateFormat(item.date)}</CardDescription>
                </div>
                <Avatar className="size-12">
                  <AvatarImage src={item.reviewerImage} />
                  <AvatarFallback>{item.reviewerName}</AvatarFallback>
                </Avatar>
              </CardHeader>
              <CardContent>
                <p className="mb-3">{item.feedback}</p>
                <Rating
                  style={{ maxWidth: 150 }}
                  value={item.rating}
                  readOnly
                />
              </CardContent>
            </Card>
          ))
        }
      </div>
    </section>
  );
};

export default MyReviews;