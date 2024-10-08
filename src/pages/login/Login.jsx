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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Link, useLocation, useNavigate } from "react-router-dom"
import SocialLogins from "../shared/socialLogins/SocialLogins"
import useAuth from "@/hooks/useAuth"
import toast from "react-hot-toast"
import { FaEye, FaEyeSlash } from "react-icons/fa"
import { useState } from "react"

const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Username must be at least 6 characters.", })
})

const Login = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const { loginUser, loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectedForm = location.state?.from?.pathname || '/';

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const handleLogin = (data) => {
    const { email, password } = data;
    loginUser(email, password)
      .then(() => {
        setLoading(false);
        toast.success('Logged in successfully!')
        navigate(redirectedForm)
      })
      .catch(() => {
        setLoading(false);
        toast.error('Incorrect email or password');
      })
  }

  return (
    <section>
      <div className="md:flex gap-6 items-center">
        <div className="flex-1 p-12">
          <div className="max-w-sm mx-auto border p-4 rounded-xl">
            <h2 className="text-3xl text-center font-semibold mb-6">Login!</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
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
                      <FormControl>
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
                <Button
                  type="submit"
                  className=" bg-red-light hover:bg-red-deep disabled:bg-gray-500 w-full"
                  disabled={loading}
                >
                  Login
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
          <p className="text-center mt-5">New here? <Link to={'/sign_up'} className="underline text-red-light">Create a new account</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;