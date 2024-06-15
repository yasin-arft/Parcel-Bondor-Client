import SectionHeading from "@/components/sectionHeading/SectionHeading";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
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
import { useLoaderData } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react";


const AllUsers = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  // pagination related variables
  const { totalUser } = useLoaderData();
  const totalPages = Math.ceil(totalUser / 5);
  const pageNumbers = [...Array(totalPages).keys()];
  const [currentPage, setCurrentPage] = useState(0);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['all user', user?.email, currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/user?page=${currentPage}`);
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
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => currentPage > 0 ? setCurrentPage(currentPage - 1) : 0}
              className="cursor-pointer"
            />
          </PaginationItem>
          {
            pageNumbers.map(page => (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={() => setCurrentPage(page)}
                  className={`border cursor-pointer ${page === currentPage && "border-red-light border-2"
                    } `}
                >
                  {page + 1}
                </PaginationLink>
              </PaginationItem>
            ))
          }
          <PaginationItem>
            <PaginationNext
              onClick={() => currentPage < totalPages ? setCurrentPage(currentPage + 1) : totalPages}
              className="cursor-pointer"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
  );
};

export default AllUsers;