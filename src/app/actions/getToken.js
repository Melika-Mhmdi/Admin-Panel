import { useEffect } from "react";
import instance from "../services/http";
import * as querystring from "querystring";

const controller = new AbortController();
export const getToken = async (code) => {
  try {
    const response = await instance.post(
      "/token",
      querystring.stringify({
        grant_type: "authorization_code",
        client_id: "api-panel",
        redirect_uri: `http://localhost:3000/auth`,
        code_verifier: localStorage.getItem("verifier"),
        code,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    localStorage.setItem("token", response.data.access_token);
    localStorage.setItem("refresh_token", response.data.refresh_token);
    localStorage.setItem("id_token", response.data.id_token);

    return Promise.resolve();
    // return data;
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
controller.abort();
