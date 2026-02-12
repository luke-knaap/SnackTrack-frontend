import {useMutation, useQueryClient} from "@tanstack/react-query";
import {SauceApiClient} from "../api/SauceApiClient";
import {CreateSauceInput} from "../schemas/create-sauce.schema";
import {sauceQueryKeys} from "./sauces.queries";

export function useCreateSauce(api: SauceApiClient) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateSauceInput) => api.create(input),
		onSuccess: async () => {
			await qc.invalidateQueries({queryKey: sauceQueryKeys.all});
		}
	});
}
