import {ApiRequestError} from "@/shared/http/apiGatewayClient";

type ApiErrorMessageOptions = {
	defaultMessage: string;
	statusMessages?: Partial<Record<number, string>>;
};

export function mapApiErrorMessage(error: unknown, options: ApiErrorMessageOptions): string | undefined {
	if (!error) return undefined;

	if (error instanceof ApiRequestError) {
		const statusMessage = options.statusMessages?.[error.status];
		if (statusMessage) return statusMessage;
		return error.message || options.defaultMessage;
	}

	return options.defaultMessage;
}
