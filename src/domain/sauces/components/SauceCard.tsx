import {Sauce} from "../schemas/sauce.schema";

export function SauceCard({sauce}: {sauce: Sauce}) {
	return (
		<div className="rounded-lg border p-4 space-y-2">
			<div className="font-semibold">{sauce.name}</div>
			<div>€ {sauce.price.toFixed(2)}</div>
		</div>
	);
}
