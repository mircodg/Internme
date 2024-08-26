import * as z from "zod";

export const academicDialogSchema = z.object({
  Nome: z.string().min(1, { message: "Please enter a valid name" }),
  Via: z.string().min(1, { message: "Please enter a valid route" }),
  NumeroCivico: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z.number().int().min(1, { message: "Please enter a valid street number" })
  ),
  CAP: z.string().min(1, { message: "Please enter a valid postal code" }),
  Citta: z.string().min(1, { message: "Please enter a valid city" }),
  Provincia: z.string().min(1, { message: "Please enter a valid province" }),
});

export const businessDialogSchema = z.object({
  Nome: z.string().min(1, { message: "Please enter a valid name" }),
  SettoreLavoro: z
    .string()
    .min(1, { message: "Please enter a valid work sector" }),
  PartitaIva: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z.number().int().min(11, { message: "Please enter a valid VAT number" })
  ),
  Via: z.string().min(1, { message: "Please enter a valid route" }),
  NumeroCivico: z.preprocess(
    (val) => (val === "" ? undefined : parseInt(val as string)),
    z.number().int().min(1, { message: "Please enter a valid street number" })
  ),
  CAP: z.string().min(1, { message: "Please enter a valid postal code" }),
  Citta: z.string().min(1, { message: "Please enter a valid city" }),
  Provincia: z.string().min(1, { message: "Please enter a valid province" }),
});

export const studentDialogSchema = z.object({
    
}); 
