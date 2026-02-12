import {queryOptions} from "@tanstack/react-query";
import {ProductApiClient} from "../api/ProductApiClient";

export const productQueryKeys = {
	all: ["products"] as const
};

export function allProductsQueryOptions(api: ProductApiClient) {
	return queryOptions({
		queryKey: productQueryKeys.all,
		queryFn: () => api.getAll(),
		staleTime: 30_000
	});
}
