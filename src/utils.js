const fixProtocol = (url) => {
  return url
    ? 'http://' + url.replace(/https?:\/\//gi, '').replace(/\/$/gi, '')
    : ''
}

const getHREF = (req) => fixProtocol(req.params[0])

module.exports = {
  fixProtocol,
  getHREF
}
