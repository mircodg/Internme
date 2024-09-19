"use client";
import React from "react";
import FormWrapper from "@/components/FormWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { EmailSchema } from "@/schema/ResetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";

function RequestResetForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      Email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof EmailSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/password/reset", {
        email: data.Email,
      });
      if (response.status === 200) {
        setIsLoading(false);
        toast({
          description: "Email sent",
        });
        form.reset();
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
      form.reset();
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper
      title="Reset Password"
      label="Enter your email to receive the reset password link"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="Email"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="Email">Email</Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Jhondoe@example.com"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              {isLoading ? (
                <LoaderCircle className=" animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          </div>
        </form>
      </Form>
    </FormWrapper>
  );
}

export default RequestResetForm;
