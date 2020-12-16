// Client side script which is provider, will be here.
const BASE_URL = window.BASE_URL || "http://localhost:5000";
const fingerprint = "demo";

const fingerprint = () => {
  var canvas = document.createElement("canvas");
  var ctx = canvas.getContext("2d");
  var txt = "i9asdm..$#po((^@KbXrww!~cz";
  ctx.textBaseline = "top";
  ctx.font = "16px 'Arial'";
  ctx.textBaseline = "alphabetic";
  ctx.rotate(0.05);
  ctx.fillStyle = "#f60";
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = "#069";
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = "rgba(102, 200, 0, 0.7)";
  ctx.fillText(txt, 4, 17);
  ctx.shadowBlur = 10;
  ctx.shadowColor = "blue";
  ctx.fillRect(-20, 10, 234, 5);
  var strng = canvas.toDataURL();
  var hash = 0;
  if (strng.length == 0) return "nothing!";
  for (i = 0; i < strng.length; i++) {
    char = strng.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return hash;
};

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

const put = async (data) => {
  const date = new Date()
  return fetch(`${BASE_URL}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ href: window.location.href, date: date.valueOf(), fingerprint: fingerprint(), ...data }),
  });
};

window.addEventListener("load", put);

window.get = get
window.count = count
window.put = put