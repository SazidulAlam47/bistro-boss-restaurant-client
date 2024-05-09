const CustomerCare = () => {
    return (
        <div className="sm:container sm:mx-auto sm:px-3 md:px-6 py-6">
            <div className="sm:relative">
                <img
                    src="/images/home/chef-service.jpg"
                    alt="Customer Care"
                    className="w-full hidden sm:block"
                />
                <div className="sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 bg-slate-100 sm:bg-white px-4 py-12 sm:px-0 sm:py-0 sm:p-6 md:p-7 lg:p-12 text-center w-full sm:w-11/12 md:w-2/3 space-y-2 lg:space-y-4">
                    <h3 className="font-cinzel text-2xl lg:text-3xl xl:text-4xl">
                        Customer Care at Bistro Boss
                    </h3>
                    <p className="text-[#151515] text-sm lg:text-base">
                        Every dish at Bistro Boss is crafted with care. From
                        salads to desserts, we prioritize your satisfaction.
                        Experience exceptional service with every order. Your
                        happiness fuels our passion. Join us for a delightful
                        culinary journey today!
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CustomerCare;
