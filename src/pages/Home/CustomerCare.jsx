const CustomerCare = () => {
    return (
        <div className="container mx-auto px-3 md:px-6 py-6">
            <div className="relative">
                <img
                    src="/images/home/chef-service.jpg"
                    alt="Customer Care"
                    className="w-full"
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-12 text-center w-2/3 space-y-4">
                    <h3 className="font-cinzel text-4xl">
                        Customer Care at Bistro Boss
                    </h3>
                    <p className="text-[#151515]">
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
