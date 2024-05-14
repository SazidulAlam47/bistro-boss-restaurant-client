import { Link } from "react-router-dom";

const Logo = () => {
    return (
        <Link to="/" className="flex flex-col font-cinzel sm:text-xl">
            <span className="font-bold sm:font-black">BISTRO BOSS</span>
            <span className="font-light sm:font-medium tracking-widest">
                Restaurant
            </span>
        </Link>
    );
};

export default Logo;
