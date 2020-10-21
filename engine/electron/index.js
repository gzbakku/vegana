const help = require('./help');
const build = require('./build/index');

module.exports = {

  init:async (type)=>{

    if(!type){
      type = await input.select('choose a api',['build','help']);
    }

    if(type === "help"){
      help();
    }

    if(type === "build"){
      build();
    }

  }

};
