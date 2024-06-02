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
import { Link } from "react-router-dom"

const formSchema = z.object({
  // email: z.string().min(1, {
  //   message: "Username must be at least 2 characters.",
  // }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z
    .string()
    .min(6, { message: "Username must be at least 6 characters.", })
})

const Login = () => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  })

  function onSubmit(values) {
    console.log(values, 22)
  }

  return (
    <section className="py-24">
      <div className="md:flex gap-6">
        <div className="flex-1 p-12">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-sm mx-auto border p-4 rounded-xl">
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
                      <Input type="password" placeholder="Type password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* {form.formState.errors.username && <p>{form.formState.errors.username.message}</p>} */}
              <Button type="submit" className="bg-red-light hover:bg-red-deep w-full" >Submit</Button>
            </form>
          </Form>
        </div>
        <div className="flex-1 p-12">
          <div className="border relative my-3">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 font-semibold text-lg">Or</span>
          </div>
          
          <p className="text-center mt-5">New here? <Link to={'register'} className="underline text-red-light">Create a new account</Link></p>
        </div>
      </div>
    </section>
  );
};

export default Login;