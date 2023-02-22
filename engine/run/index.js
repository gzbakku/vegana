const electron = require('./electron');
const cordova = require('./cordova');

module.exports = {

  init:async (platform)=>{

    if(!platform){
      platform = await input.select("please choose a platform",['electron','cordova','web']);
    }

    common.tell('initiating vegana run');

    if(platform === 'electron'){
      electron.init();
    } else if(platform === 'cordova'){
      cordova.init();
    } else if(platform === "web"){
      common.tell("please use the serve feature to run web platform.");
    } else {
      return common.error('please choose a valid platform - electron/cordova');
    }

  }

};
