import axios from "axios";

// export const baseUrl = "http://localhost:5000";
export const baseUrl =
    "https://bistro-boss-restaurant-server-delta-teal.vercel.app/";

const axiosPublic = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
