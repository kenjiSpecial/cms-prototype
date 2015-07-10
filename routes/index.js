function getClientIp(req) {

  var ipAddress;
  // Amazon EC2 / Heroku workaround to get real client IP
  var forwardedIpsStr = req.header('x-forwarded-for');
  if (forwardedIpsStr) {

    // 'x-forwarded-for' header may return multiple IP addresses in
    // the format: "client IP, proxy 1 IP, proxy 2 IP" so take the
    // the first one
    var forwardedIps = forwardedIpsStr.split(',');
    ipAddress = forwardedIps[0];
  }
  if (!ipAddress) {
    // Ensure getting client IP address still works in
    // development environment
    ipAddress = req.connection.remoteAddress;
  }
  return ipAddress;
};

/*
 * GET home page.
 */
var React = require('react');
var ReactApp = React.createFactory(require('../react/component/app'));

exports.index = function(req, res, next) {
  var reactHtml = React.renderToString(ReactApp({}));

  res.render('index.ejs', {reactContent: reactHtml});
};
