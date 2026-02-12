import {ApiGatewayClient} from "@/shared/http/apiGatewayClient";
import {Sauce, SauceListSchema, SauceSchema} from "../schemas/sauce.schema";
import {CreateSauceInput, CreateSauceSchema} from "../schemas/create-sauce.schema";
import {IApiClient} from "@/shared/interface/IApiClient";

export class SauceApiClient implements IApiClient<Sauce, CreateSauceInput> {
	public constructor(private readonly client: ApiGatewayClient) {}

	public async getAll(): Promise<Sauce[]> {
		const json = await this.client.get<unknown>("/sauces");
		return SauceListSchema.parse(json);
	}

	public async create(input: CreateSauceInput): Promise<Sauce> {
		const payload = CreateSauceSchema.parse(input);
		const json = await this.client.post<unknown>("/sauces", payload);
		return SauceSchema.parse(json);
	}
}
