import { FaFacebookF, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-[#1F2937] p-20">
                    <div className="max-w-72 ml-auto text-center space-y-1">
                        <h3 className="font-medium text-3xl pb-3">
                            Contact Us
                        </h3>
                        <p>123 ABS Street, Uni 21, Bangladesh </p>
                        <a href="tel:+8801555021112" className="inline-block">
                            +880 1555 021 112
                        </a>
                        <p>Mon -Fri: 08:00 - 22:00</p>
                        <p>Sat - Sun: 10:00 - 23:00</p>
                    </div>
                </div>
                <div className="bg-[#111827] p-20">
                    <div className="max-w-52 space-y-4 text-center">
                        <h3 className="font-medium text-3xl">Follow US</h3>
                        <p>Join us on social media</p>
                        <div className="flex gap-3 pt-1 justify-center">
                            <FaFacebookF size={25} />
                            <FaInstagram size={25} />
                            <FaXTwitter size={25} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#151515] py-4">
                <p className="text-center">
                    Copyright © CulinaryCloud. All rights reserved.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
