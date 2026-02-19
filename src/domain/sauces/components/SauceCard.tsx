import {Sauce} from "../schemas/sauce.schema";
import {Badge} from "@/components/ui/badge";
import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {formatPrice} from "@/shared/format/formatPrice";

export function SauceCard({sauce}: {sauce: Sauce}) {
	const priceLabel = formatPrice(sauce.price);

	return (
		<Card className="group border-border/80 bg-card/95 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
			<CardHeader className="space-y-3">
				<div className="flex items-start justify-between gap-3">
					<CardTitle className="text-base font-semibold tracking-tight">{sauce.name}</CardTitle>
					<Badge variant="secondary" className="bg-rose-100 text-rose-800 border-rose-200">
						Saus
					</Badge>
				</div>
			</CardHeader>

			<CardContent>
				<div className="text-sm text-muted-foreground">
					{sauce.isAvailable ? (
						<span className="inline-flex items-center gap-2">
							<span className="h-2 w-2 rounded-full bg-emerald-500" />
							Beschikbaar
						</span>
					) : (
						<span className="inline-flex items-center gap-2">
							<span className="h-2 w-2 rounded-full bg-rose-500" />
							Niet beschikbaar
						</span>
					)}
				</div>
			</CardContent>

			<CardFooter className="justify-between">
				<span className="text-xs uppercase tracking-wide text-muted-foreground">Prijs</span>
				<span className="text-lg font-semibold tabular-nums">{priceLabel}</span>
			</CardFooter>
		</Card>
	);
}
