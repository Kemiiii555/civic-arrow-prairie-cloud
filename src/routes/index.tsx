import { createFileRoute } from "@tanstack/react-router";
import { SurpriseApp } from "@/components/surprise/app";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return <SurpriseApp />;
}
