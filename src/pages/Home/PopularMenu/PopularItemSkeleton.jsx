import Skeleton from "react-loading-skeleton";

const PopularItemSkeleton = () => {
    return (
        <div className="flex flex-col sm:flex-row gap-3">
            <div className="sm:w-[30%] h-44 sm:h-24 rounded-xl sm:rounded-none sm:rounded-b-full sm:rounded-r-full overflow-hidden">
                <Skeleton className="w-full h-full" />
            </div>

            <div className="sm:w-[60%]">
                <div className="pb-1">
                    <Skeleton width={260} height={18} />
                </div>
                <Skeleton height={14} count={2} />
                <Skeleton height={14} width={200} />
            </div>
            <div className="sm:w-[10%]">
                <Skeleton height={18} />
            </div>
        </div>
    );
};

export default PopularItemSkeleton;
