
export default function CardSkeleton() {
    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl">
            <div className="animate-pulse rounded-md bg-neutral h-24 mx-10 mb-5" />
            <div className="card-body">
                <div className="animate-pulse rounded-md bg-neutral h-5 mb-2" />

                <div className="animate-pulse rounded-md bg-neutral h-3" />
                <div className="animate-pulse rounded-md bg-neutral h-3" />
                <div className="animate-pulse rounded-md bg-neutral h-3" />
                <div className="animate-pulse rounded-md bg-neutral h-3" />
            </div>
        </div>
    )
}