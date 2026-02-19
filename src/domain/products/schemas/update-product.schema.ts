import z from "zod";
import {SnackTypeSchema} from "./snack-type.schema";

export const UpdateProductSchema = z.object({
	name: z.string().min(1),
	price: z.number().min(0),
	snackType: SnackTypeSchema,
	isAvailable: z.boolean()
});

export type UpdateProductInput = z.infer<typeof UpdateProductSchema>;
