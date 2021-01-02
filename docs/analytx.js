/* eslint-disable vars-on-top */
/* eslint-disable no-undef */
/* eslint-disable no-var */
var BASE_URL = window.BASE_URL || 'http://localhost:5000';
var fingerprint = () => {
  var canvas = document.createElement('canvas');
  var ctx = canvas.getContext('2d');
  var txt = 'i9asdm..$#po((^@KbXrww!~cz';
  ctx.textBaseline = 'top';
  ctx.font = "16px 'Arial'";
  ctx.textBaseline = 'alphabetic';
  ctx.rotate(0.05);
  ctx.fillStyle = '#f60';
  ctx.fillRect(125, 1, 62, 20);
  ctx.fillStyle = '#069';
  ctx.fillText(txt, 2, 15);
  ctx.fillStyle = 'rgba(102, 200, 0, 0.7)';
  ctx.fillText(txt, 4, 17);
  ctx.shadowBlur = 10;
  ctx.shadowColor = 'blue';
  ctx.fillRect(-20, 10, 234, 5);
  var strng = canvas.toDataURL();
  var hash = 0;
  if (strng.length == 0) return 'nothing!';
  for (var i = 0; i < strng.length; i++) {
    var char = strng.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash &= hash;
  }
  return hash;
};

var get = async () => {
  var { href } = window.location;
  href = href.replace(/https?:\/\//gi, '').replace(/\/$/gi, '');
  return fetch(`${BASE_URL}/a/${href}`).then((res) => res.json());
};

var count = async () => {
  var { href } = window.location;
  href = href.replace(/https?:\/\//gi, '').replace(/\/$/gi, '');
  return fetch(`${BASE_URL}/c/${href}`).then((res) => res.json());
};

var polyfillSendBeacon = (body) => fetch(`${BASE_URL}`, {
  method: 'POST',
  body,
});

var send = (data) => {
  var date = new Date();
  var body = JSON.stringify({
    href: window.location.href,
    date: date.valueOf(),
    fingerprint: fingerprint(),
    ...data,
  });
  // Handle old browsers like android 4.4.4
  // https://caniuse.com/?search=sendBeacon
  if (!navigator.sendBeacon) {
    return polyfillSendBeacon(body);
  }
  return navigator.sendBeacon(BASE_URL, body);
};
window.send = send;
window.get = get;
window.count = count;
