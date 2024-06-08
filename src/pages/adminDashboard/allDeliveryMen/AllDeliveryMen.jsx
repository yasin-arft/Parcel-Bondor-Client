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
          <TableCaption>A list of all delivery men.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Delivery men&#39;s Name</TableHead>
              <TableHead>Phone Number</TableHead>
              <TableHead>Parcel Delivered</TableHead>
              <TableHead>Average Review</TableHead>
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