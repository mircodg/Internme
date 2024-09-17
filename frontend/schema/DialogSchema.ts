import * as z from "zod";

export const academicDialogSchema = z.object({
  NomeUniversita: z.string().min(1, { message: "Please enter a valid name" }),
  Via: z.string().min(1, { message: "Please enter a valid route" }),
  NumeroCivico: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z
      .number()
      .int()
      .refine((val) => val >= 0, {
        message: "Please enter a valid street number",
      })
  ),
  CAP: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z
      .number()
      .int()
      .refine((val) => val.toString().length === 5)
  ),
  Citta: z.string().min(1, { message: "Please enter a valid city" }),
  Provincia: z.string().refine((val) => val.length === 2, {
    message: "Please enter a valid province",
  }),
});

export const businessDialogSchema = z.object({
  Nome: z.string().min(1, { message: "Please enter a valid name" }),
  SettoreLavoro: z
    .string()
    .min(1, { message: "Please enter a valid work sector" }),
  PartitaIva: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z
      .number()
      .int()
      .refine((val) => val.toString().length === 11)
  ),
  Via: z.string().min(1, { message: "Please enter a valid route" }),
  NumeroCivico: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z
      .number()
      .int()
      .refine((val) => val >= 0, {
        message: "Please enter a valid street number",
      })
  ),
  CAP: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z
      .number()
      .int()
      .refine((val) => val.toString().length === 5)
  ),
  Citta: z.string().min(1, { message: "Please enter a valid city" }),
  Provincia: z.string().refine((val) => val.length === 2, {
    message: "Please enter a valid province",
  }),
});

export const studentDialogSchema = z.object({
  Matricola: z.preprocess(
    (val) => parseInt(val as string),
    z
      .number()
      .int()
      .refine((val) => val.toString().length === 6, {
        message: "Please enter a valid student ID",
      })
  ),
  Universita: z.string().min(1, { message: "Please enter a valid university" }),
  CorsoDiLaurea: z.string().min(1, {
    message: "Please enter a valid degree course",
  }),
  CV: z.any(),
});

export const addressSchema = z.object({
  Via: z.string().min(1, { message: "Please enter a valid route" }),
  NumeroCivico: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z
      .number()
      .int()
      .refine((val) => val >= 0, {
        message: "Please enter a valid street number",
      })
  ),
  CAP: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z
      .number()
      .int()
      .refine((val) => val.toString().length === 5)
  ),
  Citta: z.string().min(1, { message: "Please enter a valid city" }),
  Provincia: z.string().refine((val) => val.length === 2, {
    message: "Please enter a valid province",
  }),
});
