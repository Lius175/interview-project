import axios from "axios";

const useAxios = () => {
    const axiosClient = axios.create({
        baseURL: import.meta.env.VITE_BASE_URL
    });

    return {
        axiosClient
    }
};
export default useAxios;