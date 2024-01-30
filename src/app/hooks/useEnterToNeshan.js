"use client"

import crypto from "crypto-browserify";
import instance from "../services/http";
import * as querystring from "querystring";
import {useState} from "react";
export default function useEnterToNeshan() {
  const [visible, setVisible] = useState(false);

  const controller = new AbortController();
   const getToken = async (code) => {
    setVisible(true);
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
      setVisible(false);
      return Promise.resolve();
    } catch (error) {
      console.log(error);
      return Promise.reject(error);
    }
  };
  controller.abort();

  function base64URLEncode(str) {
    return str
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
  }

  function sha256(buffer) {
    return crypto.createHash("sha256").update(buffer).digest();
  }

  const popupwindow = (url, title, w, h) => {
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;
    return window.open(
      url,
      title,
      `channelmode=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${top}, left=${left}`
    );
  };
  const openNeshanPopup = () => {
    const verifier = base64URLEncode(crypto.randomBytes(32));
    const challenge = base64URLEncode(sha256(verifier));
    const redirectUri = `${window.location.origin}/auth`;
    localStorage.setItem("verifier", verifier);
    const url = `https://mt.neshanid.io/auth/realms/levant/protocol/openid-connect/auth?&client_id=api-panel&redirect_uri=${redirectUri}&scope=openid&response_type=code&code_challenge_method=S256&code_challenge=${challenge}`;
    popupwindow(url, "_self", "ورود از طریق نشان");
  };

  return ({openNeshanPopup,visible,getToken})
}
