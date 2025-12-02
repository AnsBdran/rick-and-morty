import { Link } from "@tanstack/react-router";
import type { Character } from "@/types";
import { cn } from "@/lib/utils";

type Props = {
  character: Character;
};

const statusColors = {
  Alive: "bg-emerald-500",
  Dead: "bg-rose-500",
  unknown: "bg-amber-500",
} as const;

export const CharacterCard = ({ character }: Props) => {
  return (
    <Link
      to="/characters/$id"
      params={{ id: String(character.id) }}
      className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-lg"
    >
      <img
        src={character.image}
        alt={character.name}
        className="size-20 shrink-0 rounded-lg object-cover"
      />

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate text-lg font-bold">{character.name}</h3>
          <span className="flex items-center gap-1.5 shrink-0 text-xs text-muted-foreground">
            <span
              className={cn(
                "size-2 rounded-full",
                statusColors[character.status]
              )}
            />
            {character.status}
          </span>
        </div>

        <p className="text-sm text-muted-foreground">
          {character.species}
          {character.type && ` · ${character.type}`} · {character.gender}
        </p>

        <p className="text-xs text-muted-foreground">
          <span className="text-foreground/60">Origin:</span>{" "}
          {character.origin.name}
          <span className="mx-2">·</span>
          <span className="text-foreground/60">Location:</span>{" "}
          {character.location.name}
        </p>

        <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-xs">
          {character.episode.length} episode
          {character.episode.length !== 1 && "s"}
        </span>
      </div>
    </Link>
  );
};
