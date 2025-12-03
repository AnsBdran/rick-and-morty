import { Skeleton } from "@/components/ui/skeleton";

export const CharacterCardSkeleton = () => {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-4">
      <Skeleton className="size-20 shrink-0 rounded-lg" />

      <div className="min-w-0 flex-1 space-y-1.5">
        <div className="flex items-center justify-between gap-2">
          <Skeleton className="h-6 w-32" />
          <Skeleton className="h-4 w-14" />
        </div>

        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-3 w-56" />
        <Skeleton className="h-5 w-20 rounded-full" />
      </div>
    </div>
  );
};
export const CharacterCardSkeletonList = () => {
  return (
    <div className="grid grid-cols-1 @md:grid-cols-2 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <CharacterCardSkeleton key={i} />
      ))}
    </div>
  );
};
