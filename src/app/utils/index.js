export function getCookie(name) {
  if (process.env.BROWSER) {
    return readCookieFrom(document.cookie, name);
  }
  return null;
}