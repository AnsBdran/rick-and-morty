import { Await, createFileRoute, Link } from "@tanstack/react-router";
import { getCharacters } from "@/utils/queries";
import { CharacterCard, CharacterCardSkeletonList } from "@/components";
import { Button } from "@/components/ui/button";
import type { Character } from "@/types";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: async () => {
    return { deferred: getCharacters() };
  },
});

function RouteComponent() {
  const { deferred } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-accent/30">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-16 md:py-24">
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 size-72 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="absolute bottom-10 right-10 size-96 rounded-full bg-cyan-500/10 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[500px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-4 py-1.5 text-sm backdrop-blur-sm">
            <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
            Powered by Rick and Morty API
          </div>

          <h1 className="mb-6 bg-linear-to-r from-emerald-400 via-cyan-400 to-primary bg-clip-text text-5xl font-black tracking-tight text-transparent md:text-7xl">
            Rick & Morty
            <br />
            <span className="text-foreground">Character Explorer</span>
          </h1>

          <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground md:text-xl">
            Dive into the multiverse and discover all your favorite characters
            from the hit animated series. Search, explore, and learn about every
            character across dimensions.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="min-w-[200px] bg-linear-to-r from-emerald-500 to-cyan-500 text-lg font-semibold hover:from-emerald-600 hover:to-cyan-600"
            >
              <Link to="/characters">Explore Characters</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-[200px] text-lg"
            >
              <a
                href="https://rickandmortyapi.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                View API Docs
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Characters Section */}
      <section className="px-6 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Featured Characters</h2>
              <p className="mt-1 text-muted-foreground">
                A glimpse into the multiverse
              </p>
            </div>
            <Button asChild variant="ghost" className="group">
              <Link to="/characters" className="flex items-center gap-2">
                View All
                <svg
                  className="size-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </Button>
          </div>

          <Await promise={deferred} fallback={<CharacterCardSkeletonList />}>
            {(data) => <FeaturedCharacters data={data} />}
          </Await>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-t border-border bg-card/50 px-6 py-12 backdrop-blur-sm">
        <div className="mx-auto grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          <StatCard label="Characters" value="826+" />
          <StatCard label="Locations" value="126+" />
          <StatCard label="Episodes" value="51" />
          <StatCard label="Dimensions" value="∞" />
        </div>
      </section>
    </div>
  );
}

function FeaturedCharacters({
  data,
}: {
  data: { error?: string; results?: Character[] };
}) {
  if (data.error || !data.results) {
    return (
      <p className="text-center text-muted-foreground">
        Unable to load characters
      </p>
    );
  }

  // Show first 6 characters as featured
  const featured = data.results.slice(0, 6);

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {featured.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-bold text-foreground md:text-4xl">
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}
