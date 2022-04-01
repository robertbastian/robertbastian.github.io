// GCP Cloud Function
//
// Environment vars:
// process.env.SECRET: the reCaptcha key
// process.env.PAYLOAD: the string to be sent

exports.main = function(req, res){
  res.set('Access-Control-Allow-Origin', "*")
  res.set('Access-Control-Allow-Methods', 'GET, POST');
  require('request')(
    'https://www.google.com/recaptcha/api/siteverify' +
    '?secret=' + process.env.SECRET + '&response=' + req.query.response,
    (e, _, b) => {
      if (e) {
        res.writeHead(500, "Error validating captcha response");
      } else if (!JSON.parse(b).success) {
        res.writeHead(403,"Invalid captcha response");
      } else {
        res.write(process.env.PAYLOAD);
      res.end();
    }
  });
};
