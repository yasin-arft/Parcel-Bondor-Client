import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useAuth from "@/hooks/useAuth";


const Profile = () => {
  const { user } = useAuth();

  return (
    <section>
      <div>
        <Avatar className="size-40 mx-auto">
          <AvatarImage src={user?.photoURL} />
          <AvatarFallback>{user?.displayName}</AvatarFallback>
        </Avatar>
      </div>
      <h2 className="text-center font-semibold text-3xl my-3">{user?.displayName}</h2>
      <p className="text-center text-lg"><span className="font-medium">Email:</span> {user?.email}</p>
    </section>
  );
};

export default Profile;