import * as z from "zod";

export const studentRegisterSchema = z.object({
  collegeName: z.string().min(1, {
    message: "Please enter the college name where you study",
  }),
  studentID: z.string().min(6, {
    message: "Please enter a valid student ID",
  }),
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
    message: "Password must be at least 8 characters long",
  }),
});

export const academicRegisterSchema = z.object({
  collegeName: z.string().min(1, {
    message: "Please enter the college name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const businessRegisterSchema = z.object({
  companyName: z.string().min(1, {
    message: "Please enter the company name",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});
