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
import useAuth from "@/hooks/useAuth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useEffect } from 'react';

const bookingSchema = z.object({
  name: z
    .string(),
  email: z
    .string(),
  phone: z
    .string()
    .min(11, { message: "Number length should be 11", })
    .max(11, { message: "Number length should be 11", }),
  type: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  weight: z
    .string()
    .min(0.1, { message: "Weight must be greater than 0." }),
  price: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  receiverName: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  receiverPhone: z
    .string()
    .min(11, { message: "Number length should be 11", })
    .max(11, { message: "Number length should be 11", }),
  deliveryAddress: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  requestedDeliveryDate: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  deliveryLatitude: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  deliveryLongitude: z
    .string()
    .min(1, { message: "This field has to be filled." }),

})
// defaultValues,
const BookingForm = ({ submitHandler }) => {
  const { user } = useAuth();

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: user?.displayName,
      email: user?.email,
      weight: '',
      price: '0'
    }
  })

  const weight = form.watch("weight");

  // set price dynamically
  useEffect(() => {
    if (weight) {
      const calculatedPrice =
        weight <= 1 ? weight * 50 :
          weight <= 2 ? weight * 100 :
            weight * 150;

      form.setValue("price", calculatedPrice);
    } else {
      form.setValue("price", "0");
    }
  }, [weight, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submitHandler)} className="md:grid md:grid-cols-2 gap-5">
        {/* user name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input type="text" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* user email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* phone number */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your phone number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* parcel  type */}
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parcel Type</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Write parcel type" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* parcel  weight */}
        <FormField
          control={form.control}
          name="weight"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Parcel weight (kg)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter parcel weight" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price (tk)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="auto" {...field} readOnly />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* receiver name */}
        <FormField
          control={form.control}
          name="receiverName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver name</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Write receiver name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* phone number */}
        <FormField
          control={form.control}
          name="receiverPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Receiver phone number</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Receiver phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* delivery address */}
        <FormField
          control={form.control}
          name="deliveryAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery address</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Write delivery address" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* requested delivery date */}
        <FormField
          control={form.control}
          name="requestedDeliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Requested delivery date</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Receiver phone number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* delivery address latitude */}
        <FormField
          control={form.control}
          name="deliveryLatitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery address latitude</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter latitude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* delivery address longitude */}
        <FormField
          control={form.control}
          name="deliveryLongitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery address longitude</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter longitude" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="bg-red-light hover:bg-red-deep disabled:bg-gray-500 w-full col-span-2"
          disabled={form.formState.isSubmitting}
        >
          Book Now
        </Button>
      </form>
    </Form>
  );
};

BookingForm.propTypes = {
  submitHandler: PropTypes.func
};

export default BookingForm;