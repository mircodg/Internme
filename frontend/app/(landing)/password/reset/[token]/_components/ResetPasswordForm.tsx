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

import { ResetPasswordSchema } from "@/schema/ResetPasswordSchema";
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

interface ResetPasswordFormProps {
  token: string;
}

function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(ResetPasswordSchema),
    defaultValues: {
      Password: "",
      ConfirmPassword: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetPasswordSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.put(
        "http://localhost:8000/api/password/reset",
        {
          Token: token,
          Password: data.Password,
        }
      );
      if (response.status === 200) {
        toast({
          description: response.data.message,
        });
        form.reset();
        window.location.href = "/auth/login";
      }
    } catch (error: any) {
      toast({
        description: error.response.data.message,
        variant: "destructive",
      });
      form.reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FormWrapper title="Reset Password" label="Enter your new password ">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="Password"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="Password">Password</Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="new password"
                        required
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-2">
              <FormField
                control={form.control}
                name="ConfirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <Label htmlFor="ConfirmPassword">Confirm Password</Label>
                    <FormControl>
                      <Input
                        {...field}
                        type="password"
                        placeholder="confirm new password"
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

export default ResetPasswordForm;
