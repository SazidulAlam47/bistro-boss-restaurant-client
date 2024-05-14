import { FaPhoneVolume } from "react-icons/fa6";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { TiLocation } from "react-icons/ti";
import { HiMiniClock } from "react-icons/hi2";

const OurLocation = () => {
    return (
        <section className="container mx-auto px-3 md:px-6 py-12 space-y-10">
            <SectionTitle heading="OUR LOCATION" subHeading="Visit Us" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                <div className="border flex flex-col">
                    <div className="bg-[#D1A054] text-white py-5">
                        <FaPhoneVolume size={32} className="mx-auto" />
                    </div>
                    <div className="bg-[#F3F3F3] mx-7 mb-7 text-center py-14 space-y-4 grow">
                        <h4 className="font-medium text-2xl">PHONE</h4>
                        <a className="inline-block" href="tel:+8801555021112">
                            +880 1555 021112
                        </a>
                    </div>
                </div>
                <div className="border flex flex-col">
                    <div className="bg-[#D1A054] text-white py-5">
                        <TiLocation size={32} className="mx-auto" />
                    </div>
                    <div className="bg-[#F3F3F3] mx-7 mb-7 text-center py-14 space-y-4 grow">
                        <h4 className="font-medium text-2xl">ADDRESS</h4>
                        <p>Dilkhola Road, Khulna, Bangladesh</p>
                    </div>
                </div>
                <div className="border flex flex-col">
                    <div className="bg-[#D1A054] text-white py-5">
                        <HiMiniClock size={32} className="mx-auto" />
                    </div>
                    <div className="bg-[#F3F3F3] mx-7 mb-7 text-center py-14 space-y-4 grow">
                        <h4 className="font-medium text-2xl">WORKING HOURS</h4>
                        <div>
                            <p>Mon - Fri: 08:00 - 22:00</p>
                            <p>Sat - Sun: 10:00 - 23:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurLocation;
