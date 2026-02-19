type Props = {
	isAvailable: boolean;
};

export function Availability({isAvailable}: Props) {
	if (isAvailable) {
		return (
			<span className="inline-flex items-center gap-2">
				<span className="h-2 w-2 rounded-full bg-emerald-500" />
				Beschikbaar
			</span>
		);
	}

	return (
		<span className="inline-flex items-center gap-2">
			<span className="h-2 w-2 rounded-full bg-rose-500" />
			Niet beschikbaar
		</span>
	);
}
