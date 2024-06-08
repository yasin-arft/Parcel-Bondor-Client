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
import useUsersByRole from "@/hooks/useUsersByRole";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoBicycleOutline } from "react-icons/io5";

const AllUsers = () => {
  const { data, isLoading } = useUsersByRole('user')

  if (isLoading) return
  return (
    <section>
      <SectionHeading>All users</SectionHeading>

      <div>
        <Table>
          <TableCaption>A list of all delivery men.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>User&#39;s Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Parcel Booked</TableHead>
              <TableHead>Total Spent</TableHead>
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

                  {/* TODO: Load Bellow Date */}
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      className="text-center text-xl"
                    >
                      <IoBicycleOutline />
                    </Button>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      className="text-center text-2xl"
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