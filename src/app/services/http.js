"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const instance = axios.create({
  baseURL: "https://mt.neshanid.io/auth/realms/levant/protocol/openid-connect",
});

const AxiosInterceptor = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const resInterceptor = (response) => {
      console.log("tttt");
      return response;
    };
    const errInterceptor = (error) => {
      if (!error.response) {
        dispatch(messageHandling(error));
      }
      //   dispatch(messageHandling(error.response));
      if (error.response.status === 401) {
        router.push("/login");
        // dispatch(messageHandling(error.response));
        localStorage.removeItem("token");
      } else if (error.response.status === 403) {
        // dispatch(messageHandling(error.response));
      }

      console.log(error);

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );
    return () => instance.interceptors.response.eject(interceptor);
  }, []);

  return children;
};

export default instance;
export { AxiosInterceptor };
