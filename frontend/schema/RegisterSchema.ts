import * as z from "zod";

// export const studentRegisterSchema = z.object({
//   NomeUniversità: z.string().min(1, {
//     message: "Please enter the college name where you study",
//   }),
//   // studentID: z.string().min(6, {
//   //   message: "Please enter a valid student ID",
//   // }),
//   Matricola: z.preprocess(
//     (val) => (val === "" ? undefined : parseInt(val as string)),
//     z.number().int().min(6, {
//       message: "Please enter a valid student ID",
//     })
//   ),
//   Nome: z.string().min(1, {
//     message: "Please enter your name",
//   }),
//   Cognome: z.string().min(1, {
//     message: "Please enter your last name",
//   }),
//   Email: z.string().email({
//     message: "Please enter a valid email address",
//   }),
//   Password: z.string().min(8, {
//     message: "Password must be at least 8 characters long",
//   }),
//   TipoUtente: z.literal("Studente").default("Studente"),
// });

// export const academicRegisterSchema = z.object({
//   NomeUniversità: z.string().min(1, {
//     message: "Please enter the college name",
//   }),
//   Email: z.string().email({
//     message: "Please enter a valid email address",
//   }),
//   Password: z.string().min(8, {
//     message: "Password must be at least 8 characters long",
//   }),
//   TipoUtente: z.literal("Direttore").default("Direttore"),
// });

// export const businessRegisterSchema = z.object({
//   Nome: z.string().min(1, {
//     message: "Please enter your name",
//   }),
//   Cognome: z.string().min(1, {
//     message: "Please enter your surname",
//   }),
//   DataNascita: z
//     .string()
//     .refine(
//       (val) => {
//         const date = new Date(val);
//         const currentDate = new Date();
//         const age = currentDate.getFullYear() - date.getFullYear();
//         return age >= 18;
//       },
//       {
//         message: "You must be at least 18 years old",
//       }
//     )
//     .transform((val) => {
//       const date = new Date(val);
//       const year = date.getFullYear();
//       const month = String(date.getMonth() + 1).padStart(2, "0");
//       const day = String(date.getDate()).padStart(2, "0");
//       return `${year}-${month}-${day}`;
//     }),
//   Email: z.string().email({
//     message: "Please enter a valid email address",
//   }),
//   Password: z.string().min(8, {
//     message: "Password must be at least 8 characters long",
//   }),
//   TipoUtente: z.literal("Ceo").default("Ceo"),
// });

const userSchema = z.object({
  Nome: z.string().min(1, {
    message: "Please enter your name",
  }),
  Cognome: z.string().min(1, {
    message: "Please enter your surname",
  }),
  DataNascita: z
    .string()
    .refine(
      (val) => {
        const date = new Date(val);
        const currentDate = new Date();
        const age = currentDate.getFullYear() - date.getFullYear();
        return age >= 18;
      },
      {
        message: "You must be at least 18 years old",
      }
    )
    .transform((val) => {
      const date = new Date(val);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    }),
  Email: z.string().email({
    message: "Please enter a valid email address",
  }),
  Password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const studentRegisterSchema = userSchema.extend({
  TipoUtente: z.literal("Studente").default("Studente"),
});

export const academicRegisterSchema = userSchema.extend({
  TipoUtente: z.literal("Direttore").default("Direttore"),
});

export const businessRegisterSchema = userSchema.extend({
  TipoUtente: z.literal("Ceo").default("Ceo"),
});
