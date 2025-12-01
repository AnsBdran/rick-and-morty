import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <h1>
        View <Link to="/characters">All Character</Link>
      </h1>
    </div>
  );
}
