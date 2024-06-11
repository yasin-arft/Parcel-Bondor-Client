import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useUser from "@/hooks/useUser";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { hostImage } from "@/utils/hostImage";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useState } from "react";


const profileSchema = z.object({
  photo: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'File is required.')
})

const Profile = () => {
  const [open, setOpen] = useState(false)
  const { userData, isUserLoading, refetchUser } = useUser();
  const axiosSecure = useAxiosSecure();

  const form = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      photo: []
    }
  })

  if (isUserLoading) return

  const handleUpdateProfile = async (data) => {
    const profileImageFile = { image: data.photo[0] };

    // host image
    const hostedImage = await hostImage(profileImageFile);
    const imageLink = hostedImage.data?.display_url;

    const updateUser = {
      image: imageLink
    }

    if (hostedImage?.success) {
      const res = await axiosSecure.patch(`/users/${userData._id}`, updateUser);
      if (res.data.modifiedCount) {
        toast.success('Profile picture updated!');
        refetchUser();
        setOpen(false);
      }
    }
  }

  return (
    <section className="flex justify-center items-center">
      <Card className="md:flex md:items-center md:gap-5">
        <CardHeader>
          <Avatar className="size-40 mx-auto">
            <AvatarImage src={userData?.image} />
            <AvatarFallback>{userData?.name}</AvatarFallback>
          </Avatar>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                className=" bg-red-light hover:bg-red-deep disabled:bg-gray-500"
                disabled={isUserLoading}
              >
                Upload Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload A Picture</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdateProfile)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="photo"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Upload image</FormLabel>
                        <FormControl>
                          <Input type="file"
                            onChange={(e) => field.onChange(e.target.files)}
                            ref={field.ref}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className=" bg-red-light hover:bg-red-deep disabled:bg-gray-500 w-full"
                    disabled={form.formState.isSubmitting}
                  >
                    Update Profile
                  </Button>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <CardTitle className="mb-2">{userData.name}</CardTitle>
          <p className="text-lg">
            <span className="font-medium">Email:</span> {userData.email}
          </p>
          <p className="text-lg">
            <span className="font-medium">Phone:</span> {userData.phoneNumber || "N/A"}
          </p>
        </CardContent>
      </Card>
    </section>
  );
};

export default Profile;