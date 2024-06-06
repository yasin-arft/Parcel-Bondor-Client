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
import { useForm } from "react-hook-form";
import { z } from "zod"
import { useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { CalendarIcon } from 'lucide-react';

const bookingSchema = z.object({
  name: z
    .string(),
  email: z
    .string(),
  phone: z
    .string()
    .min(11, { message: "Number length should be 11 digit", })
    .max(11, { message: "Number length should be 11 digit", }),
  type: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  weight: z
    .string()
    .min(0.1, { message: "Weight must be greater than 0." }),
  price: z
    .number(),
  receiverName: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  receiverPhone: z
    .string()
    .min(11, { message: "Number length should be 11 digit", })
    .max(11, { message: "Number length should be 11 digit", }),
  deliveryAddress: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  requestedDeliveryDate: z
    .date(),
  deliveryLatitude: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  deliveryLongitude: z
    .string()
    .min(1, { message: "This field has to be filled." }),

})


const BookingForm = ({ submitHandler, defaultValues }) => {

  const form = useForm({
    resolver: zodResolver(bookingSchema),
    defaultValues: defaultValues
  })

  const { reset, formState: { isSubmitSuccessful } } = form;

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
      form.setValue("price", 0);
    }
  }, [weight, form]);

  useEffect(() => {
    if (!isSubmitSuccessful) { return }

    reset();
  }, [isSubmitSuccessful, reset]);

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
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(new Date(field.value), "dd/MM/yyyy")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date()
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
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
  defaultValues: PropTypes.object,
  submitHandler: PropTypes.func
};

export default BookingForm;