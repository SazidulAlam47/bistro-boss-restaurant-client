import axios from "axios";

export const baseUrl = import.meta.env.VITE_BACKEND_URL;

const axiosPublic = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
