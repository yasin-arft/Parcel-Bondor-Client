import SectionHeading from "@/components/sectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoBicycleOutline } from "react-icons/io5";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";
import useAuth from "@/hooks/useAuth";

const AllUsers = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all user', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get('/users/user');
      return res.data;
    }
  });

  if (loading || isLoading) return

  const changeRole = async (id, role) => {

    const res = await axiosSecure.patch(`/users/adminUpdate/${id}`, { role: role });

    if (res.data.modifiedCount) {
      refetch();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Role changed successfully!",
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  return (
    <section>
      <SectionHeading>All users</SectionHeading>

      <div>
        <Table>
          <TableCaption>A list of all users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>User&#39;s Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead className="text-center">Total Parcel Booked</TableHead>
              <TableHead className="text-center">Total Spent</TableHead>
              <TableHead className="text-center">Make Delivery Men</TableHead>
              <TableHead className="text-center">Make Admin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phoneNumber || 'N/A'}</TableCell>
                  <TableCell className="text-center">{item.totalBookings}</TableCell>
                  <TableCell className="text-center">{item.totalSpent}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      className="text-center text-xl"
                      onClick={() => changeRole(item._id, 'deliveryMan')}
                    >
                      <IoBicycleOutline />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      className="text-center text-2xl"
                      onClick={() => changeRole(item._id, 'admin')}
                    >
                      <MdOutlineAdminPanelSettings />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AllUsers;