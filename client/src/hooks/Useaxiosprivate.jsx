import { useEffect } from "react";
import { axiosPrivate } from "../hooks/Axios";

const useAxiosPrivate = () => {

  useEffect(() => {

    const requestInterceptor = axiosPrivate.interceptors.request.use(
      (config) => {

        const token = localStorage.getItem("token");

        if (config.data instanceof FormData) {
          config.headers["Content-Type"] = "multipart/form-data";
        } else {
          config.headers["Content-Type"] = "application/json";
        }

        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }

        return config;
      },

      (error) => Promise.reject(error)
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestInterceptor);
    };

  }, []);

  return axiosPrivate;
};

export default useAxiosPrivate;