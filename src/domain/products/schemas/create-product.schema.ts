import z from "zod";
import {SnackTypeSchema} from "./snack-type.schema";

export const CreateProductSchema = z.object({
	name: z.string().min(1),
	price: z.number().min(0),
	snackType: SnackTypeSchema
});

export type CreateProductInput = z.infer<typeof CreateProductSchema>;
