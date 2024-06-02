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
import { Link } from "react-router-dom";

const UserProfile = () => {
  const { user } = useAuth();

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger className="rounded-full border-2 border-red-light overflow-hidden cursor-pointer" >
          <Avatar>
            {/* TODO: load user image */}
            <AvatarImage src="https://i.ibb.co/n7xGsYb/images.jpg" />
            <AvatarFallback>Profile</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="mr-4">
          <DropdownMenuLabel className="text-center text-xl">{user?.displayName}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link to={'/dashboard'} className="font-semibold">Dashboard</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button className="bg-red-light hover:bg-red-deep w-full">
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserProfile;