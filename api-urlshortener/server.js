const dotenv = require('dotenv')
dotenv.config();

const database = require('./services/databaseurls.js');
const webServer = require('./services/web-server.js');

async function startupMongo() {
  console.log('Starting application');
  try {
    console.log('Initializing database module');
 
    await database.initialize(process.env.MONGO_URL); 
    console.log("database initialized");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}
async function startup(){
  const data = await startupMongo();
  try {
    console.log('Initializing web server module');
    await webServer.initialize();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

async function shutdownMongo(e){
  try {
    console.log('Closing database module');
    await database.close(); 
  } catch (err) {
    console.log('Encountered error', e);
    err = err || e;
  } 
}


async function shutdown(e) {
    let err = e;
      
    console.log('Shutting down');

    await shutdownMongo();

    try {
      console.log('Closing web server module');
   
      await webServer.close();
    } catch (e) {
      console.log('Encountered error', e);
   
      err = err || e;
    }
   
    console.log('Exiting process');
   
    if (err) {
      process.exit(1); // Non-zero failure code
    } else {
      process.exit(0);
    }
  }
   
  process.on('SIGTERM', () => {
    console.log('Received SIGTERM');
   
    shutdown();
  });
   
  process.on('SIGINT', () => {
    console.log('Received SIGINT');
   
    shutdown();
  });
   
  process.on('uncaughtException', err => {
    console.log('Uncaught exception');
    console.error(err);
   
    shutdown(err);
  }); 
startup();

/* testing

curl -i -X "POST" "http://localhost:3000/api/shorturl/:URL"

curl -i -X "POST" "http://localhost:3000/api/shorturl/https://salvatoreventr.one"

curl -i -X "GET" "http://localhost:3000/api/shorturl/:URL"

curl -i -X "GET" "http://localhost:3000/api/shorturl/29b2mrnSyFHNnDmbixtos8"


curl -i -X "POST" "https://kaput-barracuda-1.glitch.me/api/shorturl/:URL"

https://kaput-barracuda-1.glitch.me/api/shorturl/uvdF7SM2BxTziVtbYfo2sX

*/