import axios from "axios";

export const baseUrl = "http://localhost:5000";

const axiosPublic = axios.create({
    baseURL: baseUrl,
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;
