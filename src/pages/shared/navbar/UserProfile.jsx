import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import useAuth from "@/hooks/useAuth";
import useUser from "@/hooks/useUser";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { logout, setLoading } = useAuth();
  const { userData } = useUser();

  const handleLogout = () => {
    logout()
      .then(() => {
        setLoading(false);
        toast.success('Logged out successfully!');
      })
      .catch(() => {
        setLoading(false);
        toast.error('An unexpected error happened!');
      })
  }

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full border-2 border-red-light overflow-hidden cursor-pointer" >
          <Avatar>
            <AvatarImage src={userData?.image} />
            <AvatarFallback>{userData?.name}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel className="text-center text-xl">{userData?.name}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={'/dashboard'} className="font-semibold">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button onClick={handleLogout} className="bg-red-light hover:bg-red-deep w-full">
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;