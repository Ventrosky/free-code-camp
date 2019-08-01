const http = require('http');
const express = require('express');
const webServerConfig = require('../config/web-server.js');
const morgan = require('morgan');
const router = require('./router.js');
const path=require("path")
const cors = require('cors');

let httpServer;
 
function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    httpServer = http.createServer(app);

    app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204
    app.use(express.static('public'));
    
    app.use(morgan('combined'));

    app.use('/api', router);//http://server:port/api/shorturl/:url

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname + '/../views/index.html'));
    });
 
    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);
 
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

function close() {
    return new Promise((resolve, reject) => {
      httpServer.close((err) => {
        if (err) {
          reject(err);
          return;
        }
   
        resolve();
      });
    });
}


module.exports.close = close;
module.exports.initialize = initialize;