

const collect = require('./collect/index');

module.exports = {

  collect:collect,

  init:async (func)=>{

    if(!func || func === "help" || func === "-h" || func === "--help"){
      func = await input.select("please select a sass function",['collect','distribute']);
    }

    if(func === "collect"){return collect.init();}

    common.error("sorry the api you are calling is not available");

  }

};
