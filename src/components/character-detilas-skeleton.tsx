import { Skeleton } from "./ui/skeleton";

export function CharacterDetailSkeleton() {
  return (
    <div className="min-h-screen p-6 md:p-10">
      {/* Back link skeleton */}
      <Skeleton className="h-5 w-36 mb-6" />

      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row gap-6 mb-8">
          <Skeleton className="w-40 h-40 rounded-2xl shrink-0" />

          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-5 w-16" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-36" />
            </div>
          </div>
        </div>

        {/* Episodes Section */}
        <section>
          <Skeleton className="h-6 w-32 mb-4" />
          <div className="grid gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between gap-4 p-3 rounded-lg bg-card border border-border"
              >
                <div className="space-y-1.5 flex-1">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-16 rounded" />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
