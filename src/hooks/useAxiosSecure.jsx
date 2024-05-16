import axios from "axios";
import { baseUrl } from "./useAxiosPublic";

const axiosSecure = axios.create({
    baseURL: baseUrl,
});

const useAxiosSecure = () => {
    return axiosSecure;
};

export default useAxiosSecure;
