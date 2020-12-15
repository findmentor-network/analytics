// Client side script which is provider, will be here.
console.log(window.location)

fetch("http://localhost:3000", {
  method: "POST",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ href: window.location.href }),
});