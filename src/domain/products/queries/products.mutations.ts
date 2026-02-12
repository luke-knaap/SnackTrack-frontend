import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProductApiClient} from "../api/ProductApiClient";
import {CreateProductInput} from "../schemas/create-product.schema";
import {productQueryKeys} from "./products.queries";

export function useCreateProduct(api: ProductApiClient) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: (input: CreateProductInput) => api.create(input),
		onSuccess: async () => {
			await qc.invalidateQueries({queryKey: productQueryKeys.all});
		}
	});
}
