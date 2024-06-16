import PropTypes from 'prop-types';
import { Button } from "@/components/ui/button";
import useAxiosSecure from '@/hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'


const ManageDeliveryActions = ({ parcelId, refetchMyList, position }) => {
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

  console.log(position);

  return (
    <div className="flex flex-col gap-3 justify-center">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="w-full"
          >
            View Location
          </Button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh]">
          <div className='pt-4'> 
            <MapContainer id='map' center={position} zoom={10} scrollWheelZoom={true} className='h-60'>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={position}>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        </DialogContent>
      </Dialog>

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
  refetchMyList: PropTypes.func,
  position: PropTypes.array
};

export default ManageDeliveryActions;