import {HeadContent, Scripts, createRootRoute} from "@tanstack/react-router";
import {TanStackRouterDevtoolsPanel} from "@tanstack/react-router-devtools";
import {TanStackDevtools} from "@tanstack/react-devtools";

import {QueryProvider} from "@/components/query-provider";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
	head: () => ({
		meta: [
			{
				charSet: "utf-8"
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				title: "TanStack Start Starter"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss
			}
		]
	}),
	shellComponent: RootDocument,
	notFoundComponent: NotFound
});

function RootDocument({children}: {children: React.ReactNode}) {
	return (
		<html lang="en" className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<QueryProvider>{children}</QueryProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right"
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />
						}
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}

function NotFound() {
	return (
		<main className="mx-auto flex min-h-[50vh] w-full max-w-xl flex-col items-center justify-center gap-3 px-6 text-center">
			<h1 className="text-2xl font-semibold">Pagina niet gevonden</h1>
			<p className="text-sm text-muted-foreground">De route bestaat niet of is verplaatst.</p>
			<a href="/" className="text-sm underline underline-offset-4">
				Terug naar home
			</a>
		</main>
	);
}
