import { useWindowSize } from "@uidotdev/usehooks";
import Skeleton from "react-loading-skeleton";

const PopularItemSkeleton = () => {
    const size = useWindowSize();
    return (
        <div className="flex gap-3">
            <div className="w-[25%] sm:w-[20%]">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-b-full rounded-r-full overflow-hidden">
                    <Skeleton className="w-full h-full" />
                </div>
            </div>
            <div className="w-[50%] sm:w-[70%]">
                <div className="pb-1">
                    <Skeleton
                        width={size.width <= 640 ? 130 : 260}
                        height={18}
                    />
                </div>
                <Skeleton height={14} count={2} />
                <Skeleton height={14} width={size.width <= 640 ? 80 : 200} />
            </div>
            <div className="w-[15%] sm:w-[10%]">
                <Skeleton height={18} />
            </div>
        </div>
    );
};

export default PopularItemSkeleton;
