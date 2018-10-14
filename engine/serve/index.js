//module
const common = require('../../common');
const cmd = require('../../cmd');

//workers
const check = require('./check');
const compile = require('./compiler');
const server = require('./server');
const socket = require('./socket');
const watcher = require('./watcher');

async function init(){

  console.log('>>> serve initiated');

  //compile here

  let doCompile = await compile.init();

  if(doCompile == false){
    return common.error('compilation failed');
  }

  //check the files

  let doCheck = await check.init();

  if(doCheck == false){
    return common.error('check failed');
  }

  //start the server

  let startServer = await server.init();

  if(startServer == false){
    return common.error('server failed');
  }

  //start the socket

  let startSocket = await socket.init();

  if(startSocket == false){
    return common.error('socket failed');
  }

  //start watcher

  let startWatcher = await watcher.init();

  if(startWatcher == false){
    return common.error('watcher failed');
  }

  //open url

  let runThis = 'start ' + startServer;

  let run = await cmd.run(runThis)
  .then(()=>{
    return true;
  })
  .catch((error)=>{
    return common.error(error);
  });

  if(run == false){
    common.error('open_browser_url failed'); 
  }

}

module.exports= {
  init:init
};
