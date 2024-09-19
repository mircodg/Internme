import * as z from "zod";

export const EmailSchema = z.object({
  Email: z.string().email({
    message: "Please enter a valid email address",
  }),
});

export const ResetPasswordSchema = z.object({
    Password: z.string().min(8, {
        message: "password must be at least 8 characters long",
    }),
    ConfirmPassword: z.string().min(8, {
        message: "password must be at least 8 characters long",
    }),
}).refine(data => data.Password === data.ConfirmPassword, {
    message: "Passwords don't match",
    path: ["ConfirmPassword"],
});
