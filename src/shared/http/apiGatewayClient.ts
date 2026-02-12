export class ApiRequestError extends Error {
	public constructor(
		public readonly status: number,
		message: string
	) {
		super(message);
		this.name = "ApiRequestError";
	}
}

export class ApiGatewayClient {
	public constructor(private readonly basesUrl: string) {}

	public async get<T>(path: string, init?: RequestInit): Promise<T> {
		const res = await fetch(`${this.basesUrl}${path}`, {
			...init,
			headers: {Accept: "application/json", ...(init?.headers ?? {})}
		});
		if (!res.ok) throw await this.toApiError(res);
		return (await res.json()) as T;
	}

	public async post<T>(path: string, body: unknown): Promise<T> {
		const res = await fetch(`${this.basesUrl}${path}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		});
		if (!res.ok) throw await this.toApiError(res);
		return (await res.json()) as T;
	}

	private async toApiError(res: Response): Promise<ApiRequestError> {
		let message = `Request failed (${res.status})`;

		try {
			const data = (await res.json()) as {message?: string; error?: string};
			message = data.message ?? data.error ?? message;
		} catch {
			// Ignore JSON parsing failures and use fallback message.
		}

		return new ApiRequestError(res.status, message);
	}
}
