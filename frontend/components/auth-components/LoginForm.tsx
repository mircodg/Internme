"use client";

import FormWrapper from "@/components/FormWrapper";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { LoginSchema } from "@/schema/LoginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const reditectUser = (userRole: "Studente" | "Ceo" | "Direttore") => {
    if (userRole === "Studente") {
      router.push("/dashboard/student");
    } else if (userRole === "Direttore") {
      router.push("/dashboard/director");
    } else {
      router.push("/dashboard/ceo");
    }
  };

  // Defining schema to use for resolver
  const form = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      Email: "",
      Password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        data,
        {
          withCredentials: true,
        }
      );
      setIsLoading(false);
      reditectUser(response.data.tipoUtente);
      toast({
        title: response.data.message,
      });
      if (response.data.message == "Already logged in") {
        toast({
          title: response.data.message,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast({
        title: "Invalid credentials ",
      });
    }
    // loginHandler();
  };

  return (
    <FormWrapper
      title="Login"
      label="Enter your email and password below to login"
    >
      {/* Card content component */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              {/* <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="name">Name</Label>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="John Doe"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              /> */}
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="email">Email</Label>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="yuourname@gmail.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="********"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? <LoaderCircle className=" animate-spin" /> : "Login"}
            </Button>
            <Button variant="outline" className="w-full" disabled>
              Login with Google coming soon...
            </Button>
            <div className="text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className=" underline">
                Sign up
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export default LoginForm;
