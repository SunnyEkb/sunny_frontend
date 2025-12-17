export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  const paths = ["/", window.location.pathname];

  // Возможные домены — текущий и без subdomain
  const hostnameParts = window.location.hostname.split(".");
  const domains = [window.location.hostname];
  if (hostnameParts.length > 1) {
    domains.push(hostnameParts.slice(-2).join("."));
  }

  cookies.forEach(cookie => {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();

    paths.forEach(path => {
      domains.forEach(domain => {

        document.cookie = `${name}=; Max-Age=0; path=${path}; domain=${domain}`;
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}`;
      });
    });
  });
}
