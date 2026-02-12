import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import type {CreateSauceInput} from "../schemas/create-sauce.schema";

type Props = {
	onSubmit: (input: CreateSauceInput) => Promise<void>;
	isPending: boolean;
};

export function CreateSauceForm({onSubmit, isPending}: Props) {
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		const payload = {
			name,
			price: Number(price)
		};

		setName("");
		setPrice("");

		await onSubmit(payload);
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded-lg">
			<Input placeholder="Naam" value={name} onChange={(e) => setName(e.target.value)} />

			<Input
				type="number"
				step="0.01"
				min="0"
				placeholder="Prijs"
				value={price}
				onChange={(e) => setPrice(e.target.value)}
			/>

			<Button type="submit" disabled={isPending}>
				{isPending ? "Opslaan..." : "Toevoegen"}
			</Button>
		</form>
	);
}
