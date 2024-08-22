import * as z from "zod";

//TODO: manage all type of login schemas

export const LoginSchema = z.object({
  // name: z.string().min(1, { message: "Name must be at least 1 characters" }),
  Email: z.string().email({
    message: "Please enter a valid email address",
  }),
  Password: z.string().min(8, {
    message: "password must be at least 8 characters long",
  }),
});
