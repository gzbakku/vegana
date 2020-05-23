//module
const common = require('../../common');
const cmd = require('../../cmd');

//workers
const check = require('./check');
const compile = require('./compiler');
const server = require('./server');
const socket = require('./socket');
const watcher = require('./watcher');
const sass = require('./sass');

async function init(port,secure){

  let run_electron = false,run_cordova = false;
  if(!port){
    port = 5566;
  }
  if(port === 'secure'){
    port = 5566;
    secure = 'secure';
  }

  if(port === 'electron'){
    run_electron = true;
    port = 5566;
  }
  if(port === 'cordova'){
    run_cordova = true;
    port = 5566;
  }

  console.log('>>> serve initiated');

  //compile here

  let doCompile = await compile.init();

  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  }

  let doLazyLoad = await compile.lazyLoader();

  if(doLazyLoad == false){
    return common.error('failed-lazy_module_compilations');
  }

  //compile css here

  let doSassCompilation = await sass.init();

  if(doSassCompilation == false){
    return common.error('failed-master_sass_compilation');
  }

  //check the files

  let doCheck = await check.init();

  if(doCheck == false){
    return common.error('check failed');
  }

  //start the server

  let startServer = await server.init(port,secure);

  if(startServer == false){
    return common.error('server failed');
  }

  //start the socket

  let startSocket = await socket.init(run_cordova);

  if(startSocket == false){
    return common.error('socket failed');
  }

  //start watcher

  let startWatcher = await watcher.init();
  if(startWatcher == false){
    return common.error('watcher failed');
  }

  //open url

  //return;

  console.log('>>> opening url in browser');

  cmd.run('start ' + startServer)
  .catch((e)=>{
    common.error(e);
    common.error('open_browser_url failed');
  });

  if(run_electron){
    console.log('>>> starting electron');
    cmd.run('electron electro.js')
    .catch((error)=>{
      common.error(error);
      common.error('failed run electron script');
      common.error('try $ electron electro.js in the command line');
    });
  }

  if(run_cordova){
    console.log('>>> starting cordova');
    start_cordova();
  }

  return true;

}

module.exports= {
  init:init
};

async function start_cordova(){
  common.tell("serving cordova");
  const do_build_api = await build_api.init();
  if(!do_build_api){
    return common.error("failed-do_build_api")
  }
  const do_copy_build_to_cordova = await copy_build_to_cordova.init();
  if(!do_copy_build_to_cordova){
    return common.error("failed-do_copy_build_to_cordova")
  }
  let path = process.cwd() + "\\cordova\\run.js";
  let script = 'node ' + path;
  const run = await cmd.run(script)
  .then((data)=>{
    console.log(data);
  })
  .catch((error)=>{
    common.error(error);
    common.error('failed run cordova script');
    common.error('try `$ cordova run` in the cordova directory');
  });
  common.success("press enter to deploy to cordova platform after you update the app");
}

async function start_cordova_new(){
  let base_path = process.cwd();
  let core_path = base_path + '\\cordova';
  process.chdir(core_path);
  const run = await cmd.run('cordova run')
  .then((data)=>{
    console.log(data);
  })
  .catch((error)=>{
    common.error(error);
    common.error('failed run cordova script');
    common.error('try `$ cordova run` in the cordova directory');
  });
  process.chdir(base_path);
}

async function start_cordova_old(){
  let path = process.cwd() + "\\cordova\\run.js";
  let script = 'node ' + path;
  const run = await cmd.run(script)
  .then((data)=>{
    console.log(data);
  })
  .catch((error)=>{
    common.error(error);
    common.error('failed run cordova script');
    common.error('try `$ cordova run` in the cordova directory');
  });
}
