// webtask.io task
//
// Secrets:  'recaptcha', the reCaptcha key
//           'payload', the string to be sent
// URL args: 'response', the captcha's response token

module.exports = function(context, req, res){
  require('request@2.56.0')(
    'https://www.google.com/recaptcha/api/siteverify' +
      '?secret=' + context.secrets.recaptcha +
      '&response=' + context.query.response,
    function(error, res2, body){
      if (error)
        res.writeHead(500, "Error validating captcha response")
      else if (!JSON.parse(body).success)
        res.writeHead(403,"Invalid captcha response")
      else
        res.write(context.secrets.payload)
      res.end()
    }
  )
}
