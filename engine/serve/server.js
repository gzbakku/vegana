const express = require('express');
const app = express();
const https = require('https');
const extra = require('fs-extra');
const fs = require('fs');
const cors = require('cors');

app.use(cors());

//prod
let projectLocation = process.cwd() + '/';

app.use(express.static(projectLocation));

app.get('/*', function(req, res){
  res.sendFile(projectLocation + 'index.html');
});

module.exports = {init:init};

function init(port,sec){

  if(sec == 'secure'){
    return secure(port);
  } else {
    return unsecure(port);
  }

}

async function secure(port){

  console.log('>>> starting secure server');

  //get dir
  const currentDirectory = process.cwd() + '/';

  //ensure
  const ssl_dir_path = currentDirectory + 'ssl_sertificates';
  const check_ssl_dir = await extra.ensureDir(ssl_dir_path)
  .then(()=>{
    return true;
  })
  .catch((e)=>{
    console.log(e);
    return false;
  });

  if(!check_ssl_dir){
    return console.log('!!! failed-check_ssl_dir-server-serve');
  }

  console.log('>>> ssl directory ensured');

  //check cert
  const certificate_path = ssl_dir_path + '/server.cert';
  const check_ssl_certificate = await extra.pathExists(certificate_path)
  .then(()=>{
    return true;
  })
  .catch((e)=>{
    console.log(e);
    return false;
  });

  console.log('>>> ssl certificate ensured');

  //check ssl key
  const ssl_key_path = ssl_dir_path + '/server.key';
  const check_ssl_key = await extra.pathExists(ssl_key_path)
  .then(()=>{
    return true;
  })
  .catch((e)=>{
    console.log(e);
    return false;
  });

  console.log('>>> ssl key ensured');

  if(
    (!check_ssl_key && check_ssl_certificate) ||
    (check_ssl_key && !check_ssl_certificate)
  ){
    console.log('!!! failed-check_ssl_key/certificate-server-serve');
    console.log('!!! make sure ssl key and certificate files exists and are valid in your project/check_ssl_certificate directory.');
    console.log('!!! delete the directory to reset the certificates.');
    return false;
  }

  //check if openssl exists
  const check_openssl = await cmd.run('openssl version')
  .then((res)=>{
    return true;
  })
  .catch((e)=>{
    console.log(e);
    return false;
  });

  if(!check_openssl){
    console.log('!!! failed-check_openss-server-serve');
    console.log('!!! make sure opensll is install correctly and is globally available in a command line program by running openssl version command.');
    return false;
  }

  console.log('>>> openssl ensured');

  if((!check_ssl_key && !check_ssl_certificate) || true){

    //make cert
    const make_certificates_command = "openssl req -nodes -new -x509 -keyout " +
    ssl_key_path + ' -out ' + certificate_path + " -subj /CN=localhost";

    const run_openssl = await cmd.run(make_certificates_command)
    .then((res)=>{
      //console.log(res);
      return true;
    })
    .catch((e)=>{
      if(e.split(" ")[0] == 'Generating'){
        return true;
      }
      console.log(e);
      return false;
    });

    if(!run_openssl){
      console.log('!!! failed-make_ssc-openssl-server-serve');
      console.log('!!! make sure openssl is install correctly and is globally available in a command line program by running openssl version command.');
      return false;
    }

    console.log('>>> openssl - ssl certificate/key generated');

  }

  //load cert

  https.createServer({
    key: fs.readFileSync(ssl_key_path),
    cert: fs.readFileSync(certificate_path)
  }, app)
  .listen(port,()=>{
    console.log('>>> vegana file server running on port ' + port);
    console.log('>>> live on : http://localhost:' + port);
  });

  return 'https://localhost:' + port;

}

function unsecure(port){

  console.log('>>> starting server');

  app.listen(port.toString(),()=>{
    console.log('>>> vegana file server running on port ' + port);
    console.log('>>> live on : http://localhost:' + port);
  });

  return 'http://localhost:' + port;

}
