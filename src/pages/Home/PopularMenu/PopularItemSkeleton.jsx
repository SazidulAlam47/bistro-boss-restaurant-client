import Skeleton from "react-loading-skeleton";

const PopularItemSkeleton = () => {
    return (
        <div className="flex gap-3">
            <div className="w-[30%] h-24 rounded-b-full rounded-r-full overflow-hidden">
                <Skeleton className="w-full h-full" />
            </div>

            <div className="w-[60%]">
                <div className="pb-1">
                    <Skeleton width={260} height={18} />
                </div>
                <Skeleton height={14} count={2} />
                <Skeleton height={14} width={200} />
            </div>
            <div className="w-[10%]">
                <Skeleton height={18} />
            </div>
        </div>
    );
};

export default PopularItemSkeleton;
