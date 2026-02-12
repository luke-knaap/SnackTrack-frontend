import {ProductsPage} from "@/domain/products/pages/ProductPage";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/products")({
	component: ProductsPage
});
