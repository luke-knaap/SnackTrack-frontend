import {ApiGatewayClient} from "@/shared/http/apiGatewayClient";
import {Product, ProductListSchema, ProductSchema} from "../schemas/product.schema";
import {CreateProductInput, CreateProductSchema} from "../schemas/create-product.schema";
import {UpdateProductInput, UpdateProductSchema} from "../schemas/update-product.schema";
import {IApiClient} from "@/shared/interface/IApiClient";

export class ProductApiClient implements IApiClient<Product, CreateProductInput> {
	public constructor(private readonly client: ApiGatewayClient) {}

	public async getAll(): Promise<Product[]> {
		const json = await this.client.get<unknown>("/products");
		return ProductListSchema.parse(json);
	}

	public async create(input: CreateProductInput): Promise<Product> {
		const payload = CreateProductSchema.parse(input);
		const json = await this.client.post<unknown>("/products", {
			name: payload.name,
			price: payload.price,
			type: payload.snackType
		});
		return ProductSchema.parse(json);
	}

	public async update(productId: string, input: UpdateProductInput): Promise<Product> {
		const payload = UpdateProductSchema.parse(input);
		const json = await this.client.put<unknown>(`/products/${productId}`, {
			name: payload.name,
			price: payload.price,
			type: payload.snackType,
			isAvailable: payload.isAvailable
		});
		if (json === undefined) {
			return ProductSchema.parse({
				id: productId,
				name: payload.name,
				price: payload.price,
				type: payload.snackType,
				isAvailable: payload.isAvailable
			});
		}
		return ProductSchema.parse(json);
	}
}
