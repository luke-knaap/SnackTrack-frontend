import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {env} from "@/shared/config/env";
import {ProductApiClient} from "../api/ProductApiClient";
import {allProductsQueryOptions} from "../queries/products.queries";
import {useCreateProduct} from "../queries/products.mutations";
import {ProductCard} from "../components/ProductCard";
import {CreateProductForm} from "../components/CreateProductForm";
import {ApiGatewayClient, ApiRequestError} from "@/shared/http/apiGatewayClient";

export function ProductsPage() {
	const api = useMemo(() => new ProductApiClient(new ApiGatewayClient(env.apiGatewayUrl)), []);

	const productsQuery = useQuery(allProductsQueryOptions(api));
	const createMutation = useCreateProduct(api);
	const createErrorMessage = getCreateProductErrorMessage(createMutation.error);

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between gap-3">
				<h1 className="text-2xl font-bold">Producten</h1>
				<CreateProductForm
					isPending={createMutation.isPending}
					errorMessage={createErrorMessage}
					onSubmit={async (input) => {
						await createMutation.mutateAsync(input);
					}}
				/>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{(productsQuery.data ?? []).map((p) => (
					<ProductCard key={p.id} product={p} />
				))}
			</div>
		</div>
	);
}

function getCreateProductErrorMessage(error: unknown): string | undefined {
	if (!error) return undefined;

	if (error instanceof ApiRequestError && error.status === 409) {
		return "Dit product bestaat al.";
	}

	return "Product opslaan is mislukt. Probeer het opnieuw.";
}
