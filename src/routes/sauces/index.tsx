import {SaucesPage} from "@/domain/sauces/pages/SaucesPage";
import {createFileRoute} from "@tanstack/react-router";

export const Route = createFileRoute("/sauces/")({
	component: SaucesPage
});
