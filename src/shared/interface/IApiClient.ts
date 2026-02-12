export interface IApiClient<TItem, TCreate> {
	getAll(): Promise<TItem[]>;
	create(input: TCreate): Promise<TItem>;
}
