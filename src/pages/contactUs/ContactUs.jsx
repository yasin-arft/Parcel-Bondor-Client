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
import { Textarea } from "@/components/ui/textarea"

const contactSchema = z.object({
  name: z
    .string()
    .min(1, { message: "This field has to be filled." }),
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  message: z
    .string()
    .min(1, { message: "This field has to be filled." })
})

const ContactUs = () => {
  const form = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      message: ''
    }
  });

  const handleMessage = (data) => {
    console.log(data);
  }

  return (
    <section>
      <section>
        <div className="md:flex gap-6 items-center">
          <div className="flex-1 p-12">
            <div className="max-w-sm mx-auto border p-4 rounded-xl">
              <h2 className="text-3xl text-center font-semibold mb-6">Contact Us</h2>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleMessage)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input type="text" placeholder="Type your name" {...field} />
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
                        <FormLabel>Your Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Type your email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Write message</FormLabel>
                        <FormControl>
                          <Textarea type="email" placeholder="Type your message" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className=" bg-red-light hover:bg-red-deep disabled:bg-gray-500 w-full"
                    // disabled={form.onSubmit}
                  >
                    Send Mail
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
};

export default ContactUs;