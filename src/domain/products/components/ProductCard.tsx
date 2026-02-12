import {Product} from "../schemas/product.schema";

export function ProductCard({product}: {product: Product}) {
	return (
		<div className="rounded-lg border p-4 space-y-2">
			<div className="font-semibold">{product.name}</div>
			<div>€ {product.price.toFixed(2)}</div>
			<div>{product.type}</div>
		</div>
	);
}
