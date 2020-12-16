// Client side script which is provider, will be here.
const BASE_URL = window.BASE_URL || "http://localhost:5000";
const fingerprint = "demo";

const get = async () => {
  let { href } = window.location;
  href = href.replace(/https?:\/\//gi, "").replace(/\/$/gi, "");
  return fetch(`${BASE_URL}/a/${href}`);
};

const count = async () => {
  let { href } = window.location;
  href = href.replace(/https?:\/\//gi, "").replace(/\/$/gi, "");
  return fetch(`${BASE_URL}/c/${href}`);
};

const put = async () => {
  return fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ href: window.location.href, fingerprint }),
  });
};

window.addEventListener("load", put);

window.get = get
window.count = count
window.put = put