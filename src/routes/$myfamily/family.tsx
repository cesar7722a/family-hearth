import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/$myfamily/family")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <aside>index paginas</aside>
    </div>
  );
}
