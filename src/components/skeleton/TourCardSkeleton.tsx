import { Skeleton } from "@/components/ui/skeleton";

const TourCardSkeleton = () => {
    return (
        <div className="rounded-lg overflow-hidden border shadow-sm">
            <Skeleton className="h-60 w-full" />
            <div className="p-4 space-y-3">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
                <Skeleton className="h-3 w-1/3" />
            </div>
        </div>
    );
};

export default TourCardSkeleton;
