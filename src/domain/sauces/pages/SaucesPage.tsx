import {useMemo, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {env} from "@/shared/config/env";
import {SauceApiClient} from "../api/SauceApiClient";
import {allSaucesQueryOptions} from "../queries/sauces.queries";
import {useCreateSauce} from "../queries/sauce.mutations";
import {SauceCard} from "../components/SauceCard";
import {CreateSauceForm} from "../components/CreateSauceForm";
import {ApiGatewayClient} from "@/shared/http/apiGatewayClient";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";

export function SaucesPage() {
	const api = useMemo(() => new SauceApiClient(new ApiGatewayClient(env.apiGatewayUrl)), []);
	const [isCreateOpen, setIsCreateOpen] = useState(false);

	const saucesQuery = useQuery(allSaucesQueryOptions(api));
	const createMutation = useCreateSauce(api);

	return (
		<div className="p-6 space-y-6">
			<div className="flex items-center justify-between gap-3">
				<h1 className="text-2xl font-bold">Sauzen</h1>

				<Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
					<DialogTrigger render={<Button />}>Saus toevoegen</DialogTrigger>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Nieuwe saus</DialogTitle>
							<DialogDescription>Vul de gegevens in om een saus toe te voegen.</DialogDescription>
						</DialogHeader>
						<CreateSauceForm
							isPending={createMutation.isPending}
							onSubmit={async (input) => {
								await createMutation.mutateAsync(input);
								setIsCreateOpen(false);
							}}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className="grid grid-cols-3 gap-4">
				{(saucesQuery.data ?? []).map((p) => (
					<SauceCard key={p.id} sauce={p} />
				))}
			</div>
		</div>
	);
}
