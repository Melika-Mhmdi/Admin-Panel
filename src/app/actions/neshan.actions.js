export function setUserDataCookie(data, isRefreshToken = false) {
    const expirationTime = new Date().getTime() + data.expires_in * 1000;
    const refreshExpireIn = new Date().getTime() + data.refresh_expires_in * 1000;
    localStorage.setItem('id_token', data.id_token);
    setCookie('access_token', data.access_token, data.refresh_expires_in / 3600);
    setCookie('expires_in', expirationTime, data.expires_in / 3600);
    if (!isRefreshToken)
      setCookie(
        'refresh_expires_in',
        refreshExpireIn,
        data.refresh_expires_in / 3600,
      );
    setCookie(
      'refresh_token',
      data.refresh_token,
      data.refresh_expires_in / 3600,
    );
  }