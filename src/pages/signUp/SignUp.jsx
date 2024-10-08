import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useNavigate } from "react-router-dom"
import SocialLogins from "../shared/socialLogins/SocialLogins"
import useAuth from "@/hooks/useAuth"
import toast from "react-hot-toast"
import useAxiosPublic from "@/hooks/useAxiosPublic"
import { hostImage } from "@/utils/hostImage"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"

const signUpSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  phoneNumber: z
    .string()
    .min(11, { message: "Number length should be 11 digit", })
    .max(11, { message: "Number length should be 11 digit", }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Username must be at least 6 characters.", }),
  photo: z
    .instanceof(FileList)
    .refine((files) => files.length > 0, 'File is required.'),
  role: z
    .string()
    .min(1, { message: "Role must be selected." })
})

const SignUp = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { createUser, updateUserProfile, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      phoneNumber: '',
      email: '',
      password: '',
      photo: [],
      role: ''
    }
  })

  const handleSignUP = async (data) => {
    const { name, email, password, phoneNumber } = data;

    const profileImageFile = { image: data.photo[0] };

    // host image
    const hostedImage = await hostImage(profileImageFile);
    const imageLink = hostedImage.data?.display_url;

    if (hostedImage?.success) {
      // after successfully hosting image create user
      createUser(email, password)
        .then(() => {
          updateUserProfile(name, imageLink)
            .then(() => {
              // store data to database
              const user = {
                name: name,
                phoneNumber: phoneNumber,
                email: email,
                role: data.role,
                image: imageLink
              }
              axiosPublic.post('/users', user)
                .then((res) => {
                  if (res.data.insertedId) {
                    toast.success('Registered successfully!');
                    navigate('/');
                    setLoading(false);
                  }
                })
            })
            .catch(() => {
              toast.error('An unexpected error happened!');
              setLoading(false);
            })
        })
        .catch(() => {
          setLoading(false);
          toast.error('An unexpected error happened!');
        })
    }
  }

  return (
    <section>
      <div className="md:flex gap-6 items-center">
        <div className="flex-1 p-12">
          <div className="max-w-full mx-auto border p-4 rounded-xl">
            <h2 className="text-3xl text-center font-semibold mb-6">Sign Up!</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSignUP)} className="md:grid md:grid-cols-2 gap-5">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input type="text" placeholder="Type name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Type your number" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" placeholder="Type email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl >
                        <div className="relative">
                          <Input type={hidePassword ? "password" : "text"} placeholder="Type password" {...field} />
                          <span
                            onClick={() => setHidePassword(!hidePassword)}
                            className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-1 w-6"
                          >
                            {
                              hidePassword ? <FaEye /> : <FaEyeSlash />
                            }
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
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
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sign up as</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="deliveryMan">Delivery Man</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className=" bg-red-light hover:bg-red-deep disabled:bg-gray-500 w-full col-span-2"
                  disabled={loading}
                >
                  Sign Up
                </Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="flex-1 p-12">
          <div className="border relative my-3">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 font-semibold text-lg">Or</span>
          </div>
          <SocialLogins />
          <p className="text-center mt-5">Already have an account? <Link to={'/login'} className="underline text-red-light">Login</Link></p>
        </div>
      </div>
    </section >
  );
};

export default SignUp;