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
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { dateFormat } from "@/utils/formatDate";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import useUsersByRole from "@/hooks/useUsersByRole";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const manageParcelSchema = z.object({
  deliveryManId: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  approxDeliveryDate: z
    .date()
})



const ManageParcelForm = ({ parcelId, refetchAllParcel }) => {
  const { data: deliveryMen, isLoading } = useUsersByRole('deliveryMan');
  const axiosSecure = useAxiosSecure();

  const form = useForm({
    resolver: zodResolver(manageParcelSchema),
    defaultValues: {
      deliveryManId: '',
      approxDeliveryDate: new Date()
    }
  })

  if (isLoading) return

  const handleManageParcel = async (data) => {
    const bookingData = {
      deliveryManId: data.deliveryManId,
      approxDeliveryDate: new Date(data.approxDeliveryDate).toISOString(),
      status: 'On The Way'
    };

    const res = await axiosSecure.patch(`/bookings/adminUpdate/${parcelId}`, bookingData);

    if (res.data.modifiedCount) {
      refetchAllParcel()
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Assigned successfully!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleManageParcel)} className="space-y-8">
        <FormField
          control={form.control}
          name="deliveryManId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assign Deliveryman</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a deliveryman" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {
                    deliveryMen.map(man => (
                      <SelectItem
                        key={man._id}
                        value={man._id}>
                        {man.name}
                      </SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="approxDeliveryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Approximate Delivery Date</FormLabel>
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
                        dateFormat(field.value)
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
        <Button
          type="submit"
          className=" bg-red-light hover:bg-red-deep disabled:bg-gray-500 w-full"
          disabled={form.formState.isSubmitting}
        >
          Assign
        </Button>
      </form>
    </Form>
  );
};

ManageParcelForm.propTypes = {
  parcelId: PropTypes.string,
  refetchAllParcel: PropTypes.func
};

export default ManageParcelForm;