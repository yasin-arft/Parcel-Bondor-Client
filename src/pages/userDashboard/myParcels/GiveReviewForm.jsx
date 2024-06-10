import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Rating } from "@smastrom/react-rating";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import '@smastrom/react-rating/style.css'
import useUser from "@/hooks/useUser";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const reviewSchema = z.object({
  rating: z
    .number()
    .min(1, { message: "Please rate deliveryman." }),
  feedback: z
    .string()
    .min(1, { message: "Please write your feedback.", })
})


const GiveReviewForm = ({ deliveryManId, bookingId }) => {
  const [rating, setRating] = useState(0);
  const { userData, isUserLoading } = useUser();
  const axiosSecure = useAxiosSecure();

  const form = useForm({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      rating: 0,
      feedback: ''
    }
  })

  if (isUserLoading) return


  const handleReview = async (data) => {
    const review = {
      reviewerName: userData.name,
      reviewerImage: userData.image,
      ...data,
      deliveryManId,
      bookingId,
      date: new Date().toISOString()
    }

    const res = await axiosSecure.post('/reviews', review);

    if (res.data.insertedId || res.data.modifiedCount) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Thanks for your feedback!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleReview)} className="space-y-8">
        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Give Rating</FormLabel>
              <FormControl>
                <Rating
                  style={{ maxWidth: 180 }}
                  value={rating}
                  ref={field.ref}
                  onChange={(e) => {
                    field.onChange(e)
                    setRating(e)
                  }}
                  isRequired
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Write your feedback</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Please give your feedback" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className=" bg-red-light hover:bg-red-deep disabled:bg-gray-500 w-full"
          disabled={false}
        >
          Place Feedback
        </Button>
      </form>
    </Form>
  );
};

GiveReviewForm.propTypes = {
  deliveryManId: PropTypes.string,
  bookingId: PropTypes.string
};

export default GiveReviewForm;