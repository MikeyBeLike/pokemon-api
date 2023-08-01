import CardSkeleton from "@/components/card-skeleton";

export default function Loading() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 15 }).map((_, i) => <CardSkeleton key={i} />)}
        </div>
    )
}