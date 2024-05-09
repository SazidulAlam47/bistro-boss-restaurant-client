const RecommendSkeleton = () => {
    return (
        <div className="bg-[#F3F3F3] animate-pulse space-y-4 pb-6">
            <div className="my-1 bg-slate-300 dark:bg-slate-700 h-56 w-full "></div>
            <div className="my-1 bg-slate-300 dark:bg-slate-700 h-5 w-2/3 mx-auto rounded-md"></div>
            <div className="space-y-2 px-6">
                <div className="my-1 bg-slate-300 dark:bg-slate-700 h-3 w-full rounded-md"></div>
                <div className="my-1 bg-slate-300 dark:bg-slate-700 h-3 w-full rounded-md"></div>
                <div className="my-1 bg-slate-300 dark:bg-slate-700 h-3 w-3/5 rounded-md"></div>
            </div>
            <div className="my-1 bg-[#E8E8E8] dark:bg-slate-700 h-11 w-[120px] mx-auto rounded-md"></div>
        </div>
    );
};

export default RecommendSkeleton;
