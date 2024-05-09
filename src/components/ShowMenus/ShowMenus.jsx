import { useQuery } from "@tanstack/react-query";
import PropTypes from "prop-types";
import MenuItemSkeleton from "./MenuItemSkeleton";
import MenuItem from "./MenuItem";
import axios from "axios";

const ShowMenus = ({ url, key }) => {
    const { data: menus, isPending } = useQuery({
        queryKey: [key],
        queryFn: async () => {
            const res = await axios.get(url);
            return res.data;
        },
    });

    if (isPending) {
        return (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                {Array(4)
                    .fill(null)
                    .map((_, index) => (
                        <MenuItemSkeleton key={index} />
                    ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {menus?.map((item) => (
                <MenuItem key={item._id} item={item} />
            ))}
        </div>
    );
};

ShowMenus.propTypes = {
    url: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired,
};

export default ShowMenus;
