import {Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button";

export function HomePage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-background p-6">
			<div className="w-full max-w-2xl space-y-8 text-center">
				<div className="space-y-2">
					<h1 className="text-4xl font-bold tracking-tight">SnackTrack</h1>
					<p className="text-muted-foreground">Beheer je producten en sauzen overzichtelijk.</p>
				</div>

				<div className="grid gap-4 sm:grid-cols-2">
					<Link to="/products" className="w-full">
						<Button size="lg" className="w-full">
							Bekijk producten
						</Button>
					</Link>

					<Link to="/sauces" className="w-full">
						<Button size="lg" variant="secondary" className="w-full">
							Bekijk sauzen
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
}
