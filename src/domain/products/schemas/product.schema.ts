import {z} from "zod";
import {SnackTypeSchema} from "./snack-type.schema";

export const ProductSchema = z.object({
	id: z.string(),
	type: SnackTypeSchema,
	name: z.string(),
	price: z.number(),
	isAvailable: z.boolean()
});

export const ProductListSchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
