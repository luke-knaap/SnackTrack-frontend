import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Product} from "../../schemas/product.schema";
import {Availability} from "@/shared/components/ProductAvailability.tsx";
import {ProductTypeBadge} from "./ProductTypeBadge";

type Props = {
	product: Product;
	priceLabel: string;
};

export function ProductCardPreview({product, priceLabel}: Props) {
	return (
		<Card className="group border-border/80 bg-card/95 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
			<CardHeader className="space-y-3">
				<div className="flex items-start justify-between gap-3">
					<CardTitle className="text-base font-semibold tracking-tight">{product.name}</CardTitle>
					<ProductTypeBadge type={product.type} />
				</div>
			</CardHeader>

			<CardContent>
				<div className="text-sm text-muted-foreground">
					<Availability isAvailable={product.isAvailable} />
				</div>
			</CardContent>

			<CardFooter className="justify-between">
				<span className="text-xs uppercase tracking-wide text-muted-foreground">Prijs</span>
				<span className="text-lg font-semibold tabular-nums">{priceLabel}</span>
			</CardFooter>
		</Card>
	);
}
