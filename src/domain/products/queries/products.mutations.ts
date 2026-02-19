import {useMutation, useQueryClient} from "@tanstack/react-query";
import {ProductApiClient} from "../api/ProductApiClient";
import {CreateProductInput} from "../schemas/create-product.schema";
import {UpdateProductInput} from "../schemas/update-product.schema";
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

export function useUpdateProduct(api: ProductApiClient) {
	const qc = useQueryClient();

	return useMutation({
		mutationFn: ({productId, input}: {productId: string; input: UpdateProductInput}) => api.update(productId, input),
		onSuccess: async () => {
			await qc.invalidateQueries({queryKey: productQueryKeys.all});
		}
	});
}
