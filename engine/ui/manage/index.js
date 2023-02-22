const libs = require("./libs");
const comps = require('./comps');

module.exports = {

  init:async (cmd)=>{

    if(get_variable("--help")){
      return common.info("you can manage a lib or comps in core ui modules.");
    }

    let valid_apis = ['libs','comps'];
    if(!cmd || valid_apis.indexOf(cmd) < 0){
      cmd = await input.select("please select a api",valid_apis);
    }

    if(cmd === "libs"){libs.init();} else
    if(cmd === "comps"){comps.init();} else {
      common.error("please provide a valid api to manage.");
    }

  }

};
