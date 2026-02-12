import {z} from "zod";

export const SauceSchema = z.object({
	id: z.string(),
	name: z.string(),
	price: z.number(),
	isAvailable: z.boolean()
});

export const SauceListSchema = z.array(SauceSchema);

export type Sauce = z.infer<typeof SauceSchema>;
