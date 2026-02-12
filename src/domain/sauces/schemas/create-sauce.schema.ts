import z from "zod";

export const CreateSauceSchema = z.object({
	name: z.string().min(1),
	price: z.number().min(0)
});

export type CreateSauceInput = z.infer<typeof CreateSauceSchema>;
