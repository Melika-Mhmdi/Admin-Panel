import { useEffect, useRef, useState } from "react";
import crypto from "crypto-browserify";
import { BASE_VARIABLE_KEYS, resolveVariable } from "../services/serviceConfig";
import unitAccessService from "../services/unitAccessService";
import { setUserDataCookie } from "../actions/neshan.actions";

const useLoginPage = ({ query, postNeshanTokenAction }) => {
  console.log(query);
  const [visible, setVisible] = useState(false);
  const [showDefaultUnitSelection, setShowDefaultUnitSelection] =
    useState(false);
  const [accessibleUnits, setAccessibleUnits] = useState(null);
  const neshanResponseRef = useRef(null);

  const redirectToDashboard = () => {
    window.location.href = "/";
  };

  const redirectToUnAuthNumber = () => {
    window.location.href = "/unauth-phonenumber";
  };

  const setApplicationSettingsAndRedirect = async () => {
    setUserDataCookie(neshanResponseRef.current);
    redirectToDashboard();
  };

  const chooseDefaultUnitHandler = async (unit) => {
    try {
      await unitAccessService.setDefaultUnit(unit.id, {
        customToken: neshanResponseRef.current.access_token,
      });
      await unitAccessService.getAllAccessibleUnit({
        customToken: neshanResponseRef.current.access_token,
      });
      await setApplicationSettingsAndRedirect();
    } catch (e) {
      // ...
    }
  };

  const showSecondLoginPage = (units) => {
    setAccessibleUnits(units);
    setShowDefaultUnitSelection(true);
  };

  const checkAccessibleUnits = async (accessibleUnitResponse) => {
    const { currentUnitCode, accessibleUnit = [] } = accessibleUnitResponse;
    if (currentUnitCode || accessibleUnit.length === 1) {
      await setApplicationSettingsAndRedirect();
    } else {
      showSecondLoginPage(accessibleUnit);
    }
  };

  const getNeshanTokenData = async () => {
    const redirectUri = `${window.location.origin}/home`;
    const verifier = localStorage.getItem("verifier");
    setVisible(true);
    const body = {
      grant_type: "authorization_code",
      client_id: resolveVariable(BASE_VARIABLE_KEYS.AUTH_CLIENT_ID),
      redirect_uri: redirectUri,
      code_verifier: verifier,
      code: query.code,
    };
    try {
      const response = await postNeshanTokenAction(body);
      console.log(response);
      neshanResponseRef.current = response;
      setVisible(false);
      const allAccessibleUnit = await unitAccessService.getAllAccessibleUnit({
        customToken: response.access_token,
      });
      await checkAccessibleUnits(allAccessibleUnit.data);
    } catch (e) {
      setUserDataCookie(neshanResponseRef.current);
      redirectToUnAuthNumber();
    }
  };
  useEffect(() => {
    if (query?.code || query?.session_state) {
      (async () => {
        await getNeshanTokenData();
      })();
    }
  }, []);

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

  return {
    visible,
    openNeshanPopup,
    showDefaultUnitSelection,
    chooseDefaultUnitHandler,
    accessibleUnits,
  };
};
export default useLoginPage;
