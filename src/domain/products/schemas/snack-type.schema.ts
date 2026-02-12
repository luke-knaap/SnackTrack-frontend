import {z} from "zod";

export const SnackTypeSchema = z.enum(["Snack", "Ice", "Drink"]);

export type SnackType = z.infer<typeof SnackTypeSchema>;
