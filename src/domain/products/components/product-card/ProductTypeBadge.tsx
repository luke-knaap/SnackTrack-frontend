import {Badge} from "@/components/ui/badge";
import {Product} from "../../schemas/product.schema";

type Props = {
	type: Product["type"];
};

export function ProductTypeBadge({type}: Props) {
	return (
		<Badge variant="secondary" className={`${getTypeBadgeClass(type)} capitalize`}>
			{type}
		</Badge>
	);
}

function getTypeBadgeClass(type: Product["type"]): string {
	switch (type) {
		case "Ice":
			return "bg-sky-100 text-sky-800 border-sky-200";
		case "Drink":
			return "bg-blue-100 text-blue-800 border-blue-200";
		case "Snack":
			return "bg-amber-100 text-amber-900 border-amber-200";
		default:
			return "";
	}
}
