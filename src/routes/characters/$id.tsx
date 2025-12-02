import { createFileRoute, Link } from "@tanstack/react-router";
import { getCharacterById, getEpisodesByIds } from "@/utils/queries";
import type { Character, Episode } from "@/types";
import { cn } from "@/lib/utils";
import { CharacterDetailSkeleton } from "@/components";

export const Route = createFileRoute("/characters/$id")({
  component: CharacterDetail,
  pendingComponent: CharacterDetailSkeleton,
  pendingMs: 0,
  loader: async ({ params }) => {
    const character: Character = await getCharacterById(+params.id);

    const episodeIds = character.episode.map((url) =>
      parseInt(url.split("/").pop()!)
    );
    const episodes: Episode[] = await getEpisodesByIds(episodeIds);

    return { character, episodes };
  },
});

const statusColors = {
  Alive: "bg-emerald-500",
  Dead: "bg-rose-500",
  unknown: "bg-amber-500",
} as const;

function CharacterDetail() {
  const { character, episodes } = Route.useLoaderData();

  return (
    <div className="min-h-screen p-6 md:p-10">
      <Link
        to="/characters"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Back to characters
      </Link>

      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <img
            src={character.image}
            alt={character.name}
            className="w-40 h-40 rounded-2xl object-cover shadow-md"
          />

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <h1 className="text-2xl md:text-3xl font-bold">
                {character.name}
              </h1>
              <span className="flex items-center gap-2 shrink-0 text-sm">
                <span
                  className={cn(
                    "size-2.5 rounded-full",
                    statusColors[character.status]
                  )}
                />
                {character.status}
              </span>
            </div>

            <div className="space-y-2 text-sm">
              <InfoRow label="Species" value={character.species} />
              {character.type && (
                <InfoRow label="Type" value={character.type} />
              )}
              <InfoRow label="Gender" value={character.gender} />
              <InfoRow label="Origin" value={character.origin.name} />
              <InfoRow label="Location" value={character.location.name} />
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <section>
          <h2 className="text-lg font-semibold mb-4">
            Episodes ({episodes.length})
          </h2>
          <div className="grid gap-2">
            {episodes.map((ep) => (
              <div
                key={ep.id}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card border border-border"
              >
                <div className="min-w-0">
                  <p className="font-medium truncate">{ep.name}</p>
                  <p className="text-xs text-muted-foreground">{ep.air_date}</p>
                </div>
                <span className="shrink-0 text-xs font-mono text-muted-foreground bg-secondary px-2 py-1 rounded">
                  {ep.episode}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-muted-foreground">{label}:</span>{" "}
      <span className="font-medium">{value}</span>
    </p>
  );
}
