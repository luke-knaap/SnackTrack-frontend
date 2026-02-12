import {defineConfig, loadEnv} from "vite";
import {devtools} from "@tanstack/devtools-vite";
import {tanstackStart} from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import viteTsConfigPaths from "vite-tsconfig-paths";
import {fileURLToPath, URL} from "url";

import tailwindcss from "@tailwindcss/vite";
import {nitro} from "nitro/vite";

const config = defineConfig(({mode}) => {
	const env = loadEnv(mode, process.cwd(), "");
	const isDev = mode === "development";

	return {
		resolve: {
			alias: {
				"@": fileURLToPath(new URL("./src", import.meta.url))
			}
		},
		plugins: [
			devtools(),
			nitro(
				isDev
					? {
							devProxy: {
								"/api/**": env.VITE_GATEWAY_URL ?? "http://localhost:7000"
							}
						}
					: undefined
			),
			// this is the plugin that enables path aliases
			viteTsConfigPaths({
				projects: ["./tsconfig.json"]
			}),
			tailwindcss(),
			tanstackStart(),
			viteReact()
		]
	};
});

export default config;
