import {queryOptions} from "@tanstack/react-query";
import {SauceApiClient} from "../api/SauceApiClient";

export const sauceQueryKeys = {
	all: ["sauces"] as const
};

export function allSaucesQueryOptions(api: SauceApiClient) {
	return queryOptions({
		queryKey: sauceQueryKeys.all,
		queryFn: () => api.getAll(),
		staleTime: 30_000
	});
}
