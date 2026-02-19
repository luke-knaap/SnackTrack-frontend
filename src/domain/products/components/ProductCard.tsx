import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from "@/components/ui/dialog";
import {formatPrice} from "@/shared/format/formatPrice";
import {IconPencil} from "@tabler/icons-react";
import {useEffect, useState, type FormEvent} from "react";
import {Product} from "../schemas/product.schema";
import {type SnackType} from "../schemas/snack-type.schema";
import {UpdateProductInput} from "../schemas/update-product.schema";
import {ProductCardPreview} from "./product-card/ProductCardPreview";
import {ProductDetailsView} from "./product-card/ProductDetailsView";
import {ProductEditForm} from "./product-card/ProductEditForm";

type Props = {
	product: Product;
	onUpdate: (productId: string, input: UpdateProductInput) => Promise<void>;
	isUpdating: boolean;
	errorMessage?: string;
};

export function ProductCard({product, onUpdate, isUpdating, errorMessage}: Props) {
	const priceLabel = formatPrice(product.price);
	const [open, setOpen] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [name, setName] = useState(product.name);
	const [price, setPrice] = useState(product.price.toString());
	const [snackType, setSnackType] = useState<SnackType>(product.type);
	const [isAvailable, setIsAvailable] = useState(product.isAvailable);

	useEffect(() => {
		if (!open) {
			setIsEditing(false);
			setName(product.name);
			setPrice(product.price.toString());
			setSnackType(product.type);
			setIsAvailable(product.isAvailable);
		}
	}, [open, product]);

	async function handleSubmit(e: FormEvent) {
		e.preventDefault();
		await onUpdate(product.id, {
			name,
			price: Number(price),
			snackType,
			isAvailable
		});
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger
				render={
					<button
						type="button"
						className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl"
					/>
				}>
				<ProductCardPreview product={product} priceLabel={priceLabel} />
			</DialogTrigger>

			<DialogContent className="sm:max-w-2xl min-h-130">
				<DialogHeader className="border-b pb-4">
					<div className="flex items-center justify-between gap-3 pr-10">
						<div className="space-y-1">
							<DialogTitle>{product.name}</DialogTitle>
							<DialogDescription>
								{isEditing ? "Pas de gegevens aan en sla op." : "Bekijk productgegevens."}
							</DialogDescription>
						</div>
						{!isEditing ? (
							<Button
								type="button"
								variant="ghost"
								size="icon-sm"
								aria-label="Product bewerken"
								onClick={() => setIsEditing(true)}>
								<IconPencil />
							</Button>
						) : null}
					</div>
				</DialogHeader>

				<div className="pt-1">
					{isEditing ? (
						<ProductEditForm
							name={name}
							price={price}
							snackType={snackType}
							isAvailable={isAvailable}
							isUpdating={isUpdating}
							errorMessage={errorMessage}
							onNameChange={setName}
							onPriceChange={setPrice}
							onSnackTypeChange={setSnackType}
							onAvailabilityChange={setIsAvailable}
							onCancel={() => setIsEditing(false)}
							onSubmit={handleSubmit}
						/>
					) : (
						<ProductDetailsView product={product} priceLabel={priceLabel} />
					)}
				</div>
			</DialogContent>
		</Dialog>
	);
}
