const euroFormatter = new Intl.NumberFormat("nl-NL", {
	style: "currency",
	currency: "EUR"
});

export function formatPrice(value: number): string {
	return euroFormatter.format(value);
}
