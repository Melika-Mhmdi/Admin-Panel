"use client";
import React from "react";
import crypto from "crypto-browserify";
import s from "./Login.module.scss";

export default function EnterToNeshan() {
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

  return (
    <>
      <div className={s.container}>
        <div>
          <div>
            <button type="primary" className={s.btn} onClick={openNeshanPopup}>
              <i className={s.icon} />
              ورود از طریق نشان
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
