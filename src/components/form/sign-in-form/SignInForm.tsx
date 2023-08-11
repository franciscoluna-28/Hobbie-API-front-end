"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

// Schema to validate the email and the password from firebase
const formSchema = z.object({
  email: z.string().email("Invalid email format").min(1),
  password: z.string().min(6),
});

export default function SignInForm() {
  const router = useRouter();
  //1) So the first step is to define our form in the component
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Afterwards, we create the onSubmit function
  // TODO add error handling properly
  async function onSubmit(values: z.infer<typeof formSchema>, e: any) {
    e.preventDefault();
    const email = values.email;
    const password = values.password;


    signIn("credentials", {
      auth,
      email,
      password,
      redirect: true,
      callbackUrl: "/home",
    });
  }

  return (
    <section className="w-full m-auto h-min">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="myuser@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password in here"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button onClick={() => onSubmit}>Login</Button>
        </form>
      </Form>
    </section>
  );
}
