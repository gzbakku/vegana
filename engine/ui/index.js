global.uiRunner = require("./runner");
const make = require("./make");
const generate = require('./generate');

module.exports = {

  init:async (cmd,name,uiLibName)=>{

    if(!cmd || ( cmd !== "new" && cmd !== "generate" )){
      cmd = await input.select("please select a function",["new","generate"]);
    }

    if(cmd === "new"){make.init(name);} else
    if(cmd === "generate"){generate.init(name,uiLibName);} else {
      common.error("please provide a valid function which are new and generate");
    }
  }

};
