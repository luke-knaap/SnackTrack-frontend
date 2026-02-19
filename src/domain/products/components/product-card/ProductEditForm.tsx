import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
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
import {Label} from "@/components/ui/label";
import {type FormEvent} from "react";
import {SnackTypeSchema, type SnackType} from "../../schemas/snack-type.schema";

type Props = {
	name: string;
	price: string;
	snackType: SnackType;
	isAvailable: boolean;
	isUpdating: boolean;
	errorMessage?: string;
	onNameChange: (value: string) => void;
	onPriceChange: (value: string) => void;
	onSnackTypeChange: (value: SnackType) => void;
	onAvailabilityChange: (value: boolean) => void;
	onCancel: () => void;
	onSubmit: (e: FormEvent) => Promise<void>;
};

export function ProductEditForm({
	name,
	price,
	snackType,
	isAvailable,
	isUpdating,
	errorMessage,
	onNameChange,
	onPriceChange,
	onSnackTypeChange,
	onAvailabilityChange,
	onCancel,
	onSubmit
}: Props) {
	return (
		<form onSubmit={onSubmit} className="space-y-4">
			<div className="grid gap-4 sm:grid-cols-2">
				<div className="space-y-2">
					<Label
						htmlFor="product-edit-name"
						className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
						Naam
					</Label>
					<Input
						id="product-edit-name"
						placeholder="Naam"
						value={name}
						onChange={(e) => onNameChange(e.target.value)}
					/>
				</div>

				<div className="space-y-2">
					<Label
						htmlFor="product-edit-price"
						className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
						Prijs
					</Label>
					<Input
						id="product-edit-price"
						type="number"
						step="0.01"
						min="0"
						placeholder="Prijs"
						value={price}
						onChange={(e) => onPriceChange(e.target.value)}
					/>
				</div>
			</div>

			<div className="grid gap-4 sm:grid-cols-2">
				<div className="space-y-2">
					<Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Type</Label>
					<DropdownMenu>
						<DropdownMenuTrigger render={<Button type="button" variant="outline" className="w-full justify-start" />}>
							{snackType}
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuGroup>
								<DropdownMenuLabel>Kies snacktype</DropdownMenuLabel>
								<DropdownMenuRadioGroup
									value={snackType}
									onValueChange={(value) => onSnackTypeChange(value as SnackType)}>
									{SnackTypeSchema.options.map((type) => (
										<DropdownMenuRadioItem key={type} value={type}>
											{type}
										</DropdownMenuRadioItem>
									))}
								</DropdownMenuRadioGroup>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>

				<div className="space-y-2">
					<Label className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Status</Label>
					<Label
						htmlFor="product-edit-available"
						className="h-8 px-3 rounded-md border bg-background inline-flex items-center gap-2 text-sm">
						<Checkbox
							id="product-edit-available"
							checked={isAvailable}
							onCheckedChange={(checked) => onAvailabilityChange(Boolean(checked))}
						/>
						Beschikbaar
					</Label>
				</div>
			</div>

			<div className="flex items-center gap-2 pt-2">
				<Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
					Annuleren
				</Button>
				<Button type="submit" disabled={isUpdating} className="flex-1">
					{isUpdating ? "Opslaan..." : "Opslaan"}
				</Button>
			</div>

			{errorMessage ? <p className="text-sm text-red-600">{errorMessage}</p> : null}
		</form>
	);
}
