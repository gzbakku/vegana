const help = require('./help');
const run = require('./run');
const build = require('./build/index');
const config = require('./config/index');

module.exports = {

  init:async (type)=>{

    if(!type){
      type = await input.select('choose a api',['build','help','config','run']);
      if(type === "build"){
        common.tell("you can config build instructions in the electronBuild.js file we use electron-builder which can be found at https://www.electron.build/");
      }
    }

    if(type === "run"){
      run.init();
    } else
    if(type === "help" || type === "--help" || type === "-h" || type === "--h" || type === "-help"){
      help();
    } else
    if(type === "build"){
      build();
    } else
    if(type === "config"){
      config.init();
    } else {
      common.error("you did not provide a valid api");
      common.tell("valid apis are build, help, config, run");
    }

  }

};
