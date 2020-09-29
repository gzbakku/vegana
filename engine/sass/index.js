

const collect = require('./collect/index');

module.exports = {

  init:(func)=>{

    if(func === "collect"){collect.init();}

  }

};
