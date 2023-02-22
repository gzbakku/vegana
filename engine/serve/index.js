const check = require('./check');
const compile = require('./compiler');
const server = require('./server');
const socket = require('./socket');
const watcher = require('./watcher');
const sass = require('./sass');
const os = require("os");
const common = require('../../common');
const { log } = require('console');
const snippets = require('./snippets');
const transform = require('./transform');
const config = require('./config');

async function init(port,secure,outside){

  let run_electron = false,run_cordova = false,run_static = false;
  if(!port){
    port = 5566;
  }
  if(port === 'secure'){
    port = 5566;
    secure = 'secure';
  }
  if(port === 'cordova'){
    run_cordova = true;
    port = 5566;
  }
  if(port === 'electron'){
    run_electron = true;
    port = 5566;
  }
  if(port === 'static'){
    run_static = true;
    port = 5566;
  }

  if(outside || port === "help" || port === "-h" || port === "--help"){
    common.info("available variables are :");
    common.info("$PLATFORM --no-serve : if you dont want to open a browser window ie vegana serve web --no-open");
    common.info("web : serves a browser window");
    common.info("cordova : serves a browser window & starts app in emulator");
    common.info("electron : serves a browser window and a electron window");
    common.info("--secure : will start a https web server");
    return;
  }

  if(get_variable("secure")){
    secure = "secure";
  }
  if(isNaN(port)){
    port = 5566;
  }

  console.log('>>> serve initiated');

  //check the files

  if(true){
    let doCheck = await check.init();
    if(doCheck == false){
      return common.error('check failed');
    }
  }

  //config
  if(true){
    let config_customize = await config.init();
    if(config_customize == false){
      return common.error('failed config customize');
    }
  }

  //compile snippets here

  if(true){
    let compileSnippets = await snippets.init();
    if(compileSnippets == false){
      return common.error('failed collect snippets');
    }
  }

  //load snippets into mem

  if(true){
    let loadSnippets = await transform.load();
    if(loadSnippets == false){
      return common.error('failed load snippets');
    }
  }

  //transform all files in project

  if(true){
    let transformFiles = await transform.all_files();
    if(transformFiles == false){
      return common.error('failed transform files');
    }
  }

  //compile here

  if(true){
    let doCompile = await compile.init();
    if(doCompile == false){
      return common.error('failed-bundle_compilation');
    }
  }

  //compile lazy moduules here

  if(true){
    let doLazyLoad = await compile.lazyLoader();
    if(doLazyLoad == false){
      return common.error('failed-lazy_module_compilations');
    }
  }

  // return;

  //compile css here

  if(true){
    let doSassCompilation = await sass.init();
    if(doSassCompilation == false){
      return common.error('failed-master_sass_compilation');
    }
  }

  //start the server

  let startServer;
  if(true){
    startServer = await server.init(port,secure);
    if(startServer == false){
      return common.error('server failed');
    }
  }

  //start the socket
  //enter to compile native app is done in socket api
  if(true){
    let startSocket = await socket.init(run_cordova,run_electron,run_static);
    if(startSocket == false){
      return common.error('socket failed');
    }
  }

  //start watcher

  let startWatcher = await watcher.init(run_static);
  if(startWatcher == false){
    return common.error('watcher failed');
  }

  //open url

  //return;

  console.log('>>> opening url in browser');

  if(!get_variable("no-serve")){
    let os_type = os.type();
    if(os_type === "Windows_NT"){
      cmd.run('start ' + startServer)
      .catch((e)=>{
        common.error(e);
        common.error('open_browser_url failed');
      });
    } else if(os_type === "Linux"){
      cmd.run('xdg-open ' + startServer)
      .catch((e)=>{
        common.error(e);
        common.error('open_browser_url failed');
      });
    }
  } else {
    common.error("will not open browser window");
  }

  if(run_electron){
    console.log('>>> starting electron');
    const path = io.dir.cwd() + '/electronRun.js';
    let runElectron = await cmd.child("node",[path]);
    global.start_electron = async ()=>{
      runElectron.close();
      runElectron = await cmd.child("node",[path]);
    }
    socket.reload();
    common.success("press enter to restart electron app");
  }

  if(run_static){

    const { fork } = require('node:child_process');
    let controller,signal,child;
    
    global.start_static = (a)=>{

      if(controller){
        common.tell("stopping static server");
        let error = false;
        child.on("exit",()=>{
          if(error){return;}
          common.tell("static server stopped");
          controller = null;
          start_static("exit");
        });
        child.on("error",(e)=>{
          if(error){return;}
          error = true;
          common.error("static server stopped with error : " + e);
          controller = null;
          start_static("error");
        });
        child.on("disconnect",(e)=>{
          if(error){return;}
          error = true;
          common.error("static server disconnected : " + e);
          controller = null;
          start_static("error");
        });
        controller.abort();
        return;
      }

      common.tell("static server started");
      controller = new AbortController();
      signal = controller.signal;
      child = fork("./static_server.js", ['child'], { signal });

      child.on('error', (err) => {
        if(err.code !== "ABORT_ERR"){
          console.error(`\n\n${err}\n\n`);
        }
      });

    }

    start_static();
    
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

global.start_cordova = start_cordova;

//enter button reload happens in socket
async function start_cordova(){
  common.tell("serving cordova");
  const do_build_api = await build_api.init('',true);
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
    // console.log(data);
  })
  .catch((error)=>{
    common.error(error);
    common.error('failed run cordova script');
    common.error('try `$ cordova run` in the cordova directory');
  });
  common.success("press enter to deploy to cordova platform after you update the app");
}
