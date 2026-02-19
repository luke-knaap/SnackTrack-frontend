import {z} from "zod";

export const SnackTypeSchema = z.enum(["Snack", "Drink", "Ice"]);

export type SnackType = z.infer<typeof SnackTypeSchema>;
