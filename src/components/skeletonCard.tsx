import { Skeleton } from "@/components/ui/skeleton";

export function LocalSkeleton() {
  return (
    <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-md shadow-md">
      <Skeleton className="h-4" />
      <Skeleton className="h-4" />
      <Skeleton className="h-4" />
    </div>
  );
}

export default function SkeletonCard({ count = 4 }: { count?: number }) {
  return [...Array(count)].map((_, i) => <LocalSkeleton key={i} />);
}
