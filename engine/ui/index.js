global.uiRunner = require("./runner");
const make = require("./make");
const generate = require('./generate');
const link = require('./link');
const manage = require('./manage/index');
const upgrade = require('./upgrade/index');

module.exports = {

  init:async (cmd,name,uiLibName)=>{

    if(get_variable("--help")){
      return common.info("you can pass comp name with --name var and ui lib name by --lib || --ui || --ui-lib");
    }

    if(uiLibName && uiLibName.indexOf("--") >= 0){
      uiLibName = null;
    }
    if(name && name.indexOf("--") >= 0){
      name = null;
    }
    if(!name){
      name = get_variable("--name");
    }

    let valid_apis = ['new','generate','manage','upgrade','link'];
    if(!cmd || valid_apis.indexOf(cmd) < 0){
      cmd = await input.select("please select a api",valid_apis);
    }

    if(cmd === "new"){make.init(name);} else
    if(cmd === "link"){link.init(name);} else
    if(cmd === "manage"){manage.init(name);} else
    if(cmd === "upgrade"){upgrade.init(name);} else
    if(cmd === "generate"){
      if(!uiLibName){
        uiLibName = get_variable("--ui-lib") || get_variable("--lib") || get_variable("--ui");
      }
      generate.init(name,uiLibName);
    } else {
      common.error("please provide a valid function which are new and generate");
    }
  }

};
