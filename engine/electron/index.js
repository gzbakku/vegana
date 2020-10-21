const help = require('./help');
const build = require('./build/index');
const config = require('./config/index');

module.exports = {

  init:async (type)=>{

    if(!type){
      type = await input.select('choose a api',['build','help','config']);
      if(type === "build"){
        common.tell("you can config build instructions in the electronBuild.js file we use electron-builder which can be found at https://www.electron.build/");
      }
    }

    if(type === "help"){
      help();
    } else
    if(type === "build"){
      build();
    } else
    if(type === "config"){
      config.init();
    }

  }

};
