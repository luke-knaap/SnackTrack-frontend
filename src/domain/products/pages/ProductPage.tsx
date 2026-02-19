import {useMemo} from "react";
import {useQuery} from "@tanstack/react-query";
import {env} from "@/shared/config/env";
import {ProductApiClient} from "../api/ProductApiClient";
import {allProductsQueryOptions} from "../queries/products.queries";
import {useCreateProduct, useUpdateProduct} from "../queries/products.mutations";
import {ProductCard} from "../components/ProductCard";
import {CreateProductForm} from "../components/CreateProductForm";
import {ApiGatewayClient} from "@/shared/http/apiGatewayClient";
import {mapApiErrorMessage} from "@/shared/http/errors/mapApiErrorMessage";

export function ProductsPage() {
	const api = useMemo(() => new ProductApiClient(new ApiGatewayClient(env.apiGatewayUrl)), []);

	const productsQuery = useQuery(allProductsQueryOptions(api));
	const createMutation = useCreateProduct(api);
	const updateMutation = useUpdateProduct(api);
	const createErrorMessage = mapApiErrorMessage(createMutation.error, {
		defaultMessage: "Product opslaan is mislukt. Probeer het opnieuw.",
		statusMessages: {
			409: "Dit product bestaat al."
		}
	});
	const updateErrorMessage = mapApiErrorMessage(updateMutation.error, {
		defaultMessage: "Product bijwerken is mislukt. Probeer het opnieuw.",
		statusMessages: {
			404: "Dit product bestaat niet meer."
		}
	});

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
					<ProductCard
						key={p.id}
						product={p}
						isUpdating={updateMutation.isPending}
						errorMessage={updateErrorMessage}
						onUpdate={async (productId, input) => {
							await updateMutation.mutateAsync({productId, input});
						}}
					/>
				))}
			</div>
		</div>
	);
}
