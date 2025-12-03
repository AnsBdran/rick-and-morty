import { Await, createFileRoute } from "@tanstack/react-router";
import { getCharacters } from "@/utils/queries";
import {
  CharacterCard,
  CharacterCardSkeleton,
  CharacterCardSkeletonList,
} from "@/components";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useMemo, type ChangeEvent } from "react";
import type { Character } from "@/types";
import { cn, debounce } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";

export const Route = createFileRoute("/characters/")({
  component: RouteComponent,
  pendingMs: 0,
  pendingComponent: CharacterCardSkeleton,
  validateSearch: (search) => search as { query?: string },
  loaderDeps: ({ search }) => ({ query: search.query }),
  loader: async ({ deps: { query } }) => {
    return { deferred: getCharacters(query) };
  },
});

function RouteComponent() {
  const { deferred } = Route.useLoaderData();
  const navigate = Route.useNavigate();
  const { query } = Route.useSearch();
  const [inputValue, setInputValue] = useState(query ?? "");
  const [hasError, setHasError] = useState(false);

  const debouncedNavigate = useMemo(
    () =>
      debounce((value: string) => {
        navigate({ search: { query: value || undefined } });
      }, 300),
    [navigate]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    debouncedNavigate(value);
  };

  return (
    <div className="space-y-6 p-3 py-8 max-w-svh mx-auto overflow-hidden h-screen">
      <div className="h-1/5">
        <h1>Rick and Morty characters</h1>
        <Input
          placeholder="search by name"
          value={inputValue}
          type="text"
          onChange={handleChange}
          className={cn({
            "border-rose-400 focus-visible:border-rose-400 focus-visible:ring-rose-500":
              hasError,
          })}
        />
        <p className="text-xs text-muted-foreground mt-1 ps-1">
          Results found: {40}
        </p>
      </div>

      <ScrollArea className="h-4/5 @container px-3 border-t pb-4 border-accent shadow-lg shadow-card">
        <Await promise={deferred} fallback={<CharacterCardSkeletonList />}>
          {(data) => (
            <CharacterResults data={data} onErrorChange={setHasError} />
          )}
        </Await>
      </ScrollArea>
    </div>
  );
}

// Helper component to sync error state via useEffect
function CharacterResults({
  data,
  onErrorChange,
}: {
  data: { error?: string; results?: Character[] };
  onErrorChange: (hasError: boolean) => void;
}) {
  const hasError = !!data.error;

  useEffect(() => {
    onErrorChange(hasError);
  }, [hasError, onErrorChange]);

  if (data.error) {
    return (
      <h2 className="text-center text-destructive py-4">No characters found</h2>
    );
  }

  return (
    <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
      {data.results?.map((c) => (
        <CharacterCard key={c.id} character={c} />
      ))}
    </div>
  );
}
