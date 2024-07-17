import * as z from "zod";

export const RegisterSchema = z
  .object({
    firstName: z.string().min(1, {
      message: "Please enter your name",
    }),
    lastName: z.string().min(1, {
      message: "Please enter your last name",
    }),
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
      message: "password must be at least 8 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passwords must match!",
      path: ["confirmPassword"],
    }
  );
