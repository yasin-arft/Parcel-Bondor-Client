import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const ManageDeliveryActions = ({ parcelId, refetchMyList }) => {
  const axiosSecure = useAxiosSecure();

  const updateStatus = async (id, status) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${status === 'Delivered' ? 'Deliver' : 'Cancel'} it!`,
      cancelButtonText: 'No'
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosSecure.patch(`bookings/deliveryman/${id}`, { status: status });

        if (res.data.modifiedCount) {
          refetchMyList();
          Swal.fire({
            title: `${status}!`,
            icon: "success",
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    });
  }
  return (
    <div className="flex flex-col gap-3 justify-center">
      <Button
        variant="outline"
      >
        View Location
      </Button>
      <Button
        onClick={() => updateStatus(parcelId, 'Delivered')}
        variant="outline"
      >
        Deliver
      </Button>
      <Button
        onClick={() => updateStatus(parcelId, 'Cancelled')}
        variant="outline"
      >
        Cancel
      </Button>
    </div>
  );
};

ManageDeliveryActions.propTypes = {
  parcelId: PropTypes.string,
  refetchMyList: PropTypes.func
};

export default ManageDeliveryActions;