global.uiRunner = require("./runner");
const make = require("./make");
const generate = require('./generate');
const manage = require('./manage');
const upgrade = require('./upgrade');

module.exports = {

  init:async (cmd,name,uiLibName)=>{

    if(uiLibName && uiLibName.indexOf("--") >= 0){
      uiLibName = null;
    }

    let valid_apis = ['new','generate','manage','upgrade'];
    if(!cmd || valid_apis.indexOf(cmd) < 0){
      cmd = await input.select("please select a api",valid_apis);
    }

    if(cmd === "new"){make.init(name);} else
    if(cmd === "manage"){manage.init(name);} else
    if(cmd === "upgrade"){upgrade.init(name);} else
    if(cmd === "generate"){
      if(!uiLibName){
        uiLibName = get_variable("--ui-lib");
      }
      generate.init(name,uiLibName);
    } else {
      common.error("please provide a valid function which are new and generate");
    }
  }

};
