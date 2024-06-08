import SectionHeading from "@/components/sectionHeading/SectionHeading";
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

const AllDeliveryMen = () => {
  const { data, isLoading } = useUsersByRole('deliveryMan')

  if (isLoading) return

  return (
    <section>
      <SectionHeading>All delivery men</SectionHeading>

      <div>
        <Table>
          <TableCaption>A list of your parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Delivery men&#39;s Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Number of parcel delivered</TableHead>
              <TableHead>Average review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phoneNumber}</TableCell>

                  {/* TODO: Load Bellow Date */}
                  <TableCell>N/A</TableCell>
                  <TableCell>N/A</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AllDeliveryMen;