import {Product} from "../../schemas/product.schema";
import {Availability} from "@/shared/components/ProductAvailability.tsx";
import {ProductTypeBadge} from "./ProductTypeBadge";

type Props = {
	product: Product;
	priceLabel: string;
};

export function ProductDetailsView({product, priceLabel}: Props) {
	return (
		<div className="grid gap-3 text-sm sm:grid-cols-2">
			<div className="rounded-lg border bg-muted/20 px-4 py-3 flex items-center justify-between gap-3">
				<span className="text-muted-foreground">Naam</span>
				<span className="font-medium">{product.name}</span>
			</div>
			<div className="rounded-lg border bg-muted/20 px-4 py-3 flex items-center justify-between gap-3">
				<span className="text-muted-foreground">Type</span>
				<ProductTypeBadge type={product.type} />
			</div>
			<div className="rounded-lg border bg-muted/20 px-4 py-3 flex items-center justify-between gap-3">
				<span className="text-muted-foreground">Beschikbaarheid</span>
				<Availability isAvailable={product.isAvailable} />
			</div>
			<div className="rounded-lg border bg-muted/20 px-4 py-3 flex items-center justify-between gap-3">
				<span className="text-muted-foreground">Prijs</span>
				<span className="font-semibold tabular-nums">{priceLabel}</span>
			</div>
		</div>
	);
}
