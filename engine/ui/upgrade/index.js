const lib = require("./lib");
const core = require('./core');
const lazy = require('./lazy');

module.exports = {

  init:async (cmd)=>{

    if(get_variable("--help")){
      return common.info("you can upgrade a lib or core ui module structure.");
    }

    let valid_apis = ['lib','core','lazy'];
    if(!cmd || valid_apis.indexOf(cmd) < 0){
      cmd = await input.select("please select a api",valid_apis);
    }

    if(cmd === "lib"){lib.init();} else
    if(cmd === "lazy"){await lazy.init();} else
    if(cmd === "core"){core.init();} else {
      common.error("please provide a valid api to upgrade.");
    }

  }

};
