import SectionHeading from "@/components/sectionHeading/SectionHeading";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { dateFormat } from "@/utils/formatDate";
import { Button } from "@/components/ui/button";
import { BsThreeDots } from "react-icons/bs";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import ManageParcelForm from "./ManageParcelForm";
import SearchDateRange from "./SearchDateRange";
import { useState } from "react";
import { CiFilter } from "react-icons/ci";


const AllParcels = () => {
  const axiosSecure = useAxiosSecure();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [header, setHeader] = useState('All');

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['bookings', fromDate, toDate],
    queryFn: async () => {
      const res = await axiosSecure.get(`/bookings?fromDate=${fromDate}&toDate=${toDate}`);
      return res.data
    }
  });

  if (isLoading) return

  const handleDateRange = (data) => {
    setFromDate(new Date(data.fromDate).toISOString());
    setToDate(new Date(data.toDate).toISOString());
    setHeader('Filtered')
  }

  return (
    <section>
      <SectionHeading>{header} Parcels</SectionHeading>

      <div>
        <Table className="border-y overflow-auto">
          <TableCaption>A list of your parcels.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>User&#39;s Name</TableHead>
              <TableHead>User&#39;s Phone</TableHead>
              <TableHead>Booking Date</TableHead>
              <TableHead className="flex justify-between items-center">
                Req. Delivery Date
                <Popover>
                  <PopoverTrigger>
                    <CiFilter className="text-black text-lg" />
                  </PopoverTrigger>
                  <PopoverContent className="mr-4">
                    <SearchDateRange handleDateRange={handleDateRange} />
                  </PopoverContent>
                </Popover>
              </TableHead>
              <TableHead>Cost</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-center">Manage</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              data.map((item, idx) => (
                <TableRow key={item._id}>
                  <TableCell>{idx + 1}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {
                      dateFormat(item.bookingDate)
                    }
                  </TableCell>
                  <TableCell>
                    {
                      dateFormat(item.requestedDeliveryDate)
                    }
                  </TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell className="first-letter:uppercase">{item.status}</TableCell>
                  <TableCell className="text-center text-xl">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                        >
                          <BsThreeDots />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="mr-4">
                        <ManageParcelForm parcelId={item._id} refetchAllParcel={refetch} />
                      </PopoverContent>
                    </Popover>
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

export default AllParcels;