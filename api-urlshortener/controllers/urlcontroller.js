
const urlapis = require('../db_apis/urlapis.js');
const URL_PATTERN = /^https?:\/\/(www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-a-z0-9()@:%_\+.~#?&//=]*)$/i
const dns = require('dns');


async function post(req, res, next) {
    console.log("PARAM POST:", req.params.url);
    
    try {
      let urlin = req.params.url;
      if(urlin == undefined || !URL_PATTERN.test(req.params.url)){
        return res.status(501).send({
          "error": "invalid URL"
        });
      }
      
      let regex = /^https?:\/\/((?:www\.)?[-a-z0-9@:%._\+~#=]{1,256}\.[a-z0-9()]{1,6})\b/i;
      let domain = regex.exec(urlin)[1];
      let lookRes = await dns.lookup(domain, (err, hostname, service) => {
        if(err){
          console.log(domain, err.errno)
          return undefined;
        }
        console.log(hostname, service)
        return hostname;
      });
      if(lookRes == undefined){
        return res.status(501).send({
          "error": "invalid URL"
        });
      }
      let newUrlData = await urlapis.insertURL(urlin);
      return res.status(201).json(newUrlData);
    } catch (err){
      next(err);
    }
}

async function get(req, res, next) {
    try {
        console.log("PARAM GET:", req.params.url)
        const oldUrlData = await urlapis.findURL(req.params.url);
        if (oldUrlData != null) {
            console.log(oldUrlData.original_url)
            res.redirect(oldUrlData.original_url);
        } else {
          res.status(404).end();
        }
    } catch (err) {
      next(err);
    }
}

  
module.exports.post = post; 
module.exports.get = get;