import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuLabel,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import type {CreateProductInput} from "../schemas/create-product.schema";
import {SnackTypeSchema, type SnackType} from "../schemas/snack-type.schema";

type Props = {
	onSubmit: (input: CreateProductInput) => Promise<void>;
	isPending: boolean;
	errorMessage?: string;
};

export function CreateProductForm({onSubmit, isPending, errorMessage}: Props) {
	const [open, setOpen] = useState(false);
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [snackType, setSnackType] = useState<SnackType>("Snack");

	async function handleSubmit(e: React.ChangeEvent) {
		e.preventDefault();

		const payload = {
			name,
			price: Number(price),
			snackType
		};

		await onSubmit(payload);
		setName("");
		setPrice("");
		setSnackType("Snack");
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={<Button />}>Product toevoegen</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Nieuw product</DialogTitle>
					<DialogDescription>Vul de gegevens in om een product toe te voegen.</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="flex flex-col gap-3">
					<Input placeholder="Naam" value={name} onChange={(e) => setName(e.target.value)} />

					<Input
						type="number"
						step="0.01"
						min="0"
						placeholder="Prijs"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
					/>

					<DropdownMenu>
						<DropdownMenuTrigger render={<Button type="button" variant="outline" className="w-full justify-start" />}>
							{snackType}
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuLabel>Kies snacktype</DropdownMenuLabel>
								<DropdownMenuRadioGroup value={snackType} onValueChange={(value) => setSnackType(value as SnackType)}>
									{SnackTypeSchema.options.map((type) => (
										<DropdownMenuRadioItem key={type} value={type}>
											{type}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>

					<Button type="submit" disabled={isPending} className="w-full">
						{isPending ? "Opslaan..." : "Toevoegen"}
					</Button>

					{errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
				</form>
			</DialogContent>
		</Dialog>
	);
}
