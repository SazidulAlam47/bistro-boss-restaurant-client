import { Parallax } from "react-parallax";

const CustomerCare = () => {
    return (
        <Parallax
            blur={{ min: -15, max: 15 }}
            bgImage="/images/home/chef-service.png"
            bgImageAlt="Bistro Boss"
            strength={-200}
            renderLayer={(percentage) => (
                <div
                    style={{
                        position: "absolute",
                        left: "50%",
                        top: "50%",
                        width: percentage * 500,
                        height: percentage * 500,
                    }}
                />
            )}
        >
            <div className="bg-white my-24 mx-auto px-4 py-12 sm:px-3 sm:py-4  md:p-7 lg:p-16 xl:p-24 text-center w-full sm:w-11/12 md:w-2/3 space-y-2 lg:space-y-4">
                <h3 className="font-cinzel text-2xl lg:text-3xl xl:text-4xl">
                    Customer Care at Bistro Boss
                </h3>
                <p className="text-sm lg:text-base">
                    Every dish at Bistro Boss is crafted with care. From salads
                    to desserts, we prioritize your satisfaction. Experience
                    exceptional service with every order. Your happiness fuels
                    our passion. Join us for a delightful culinary journey
                    today!
                </p>
            </div>
        </Parallax>
    );
};

export default CustomerCare;
