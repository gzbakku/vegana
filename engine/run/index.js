const electron = require('./electron');
const cordova = require('./cordova');

module.exports = {

  init:(platform)=>{

    console.log('>>> initiating vegana run');

    if(platform !== 'electron' && platform !== 'cordova'){
      return common.error('please choose a valid platform - electron/cordova');
    }

    if(platform == 'electron'){
      electron.init();
    }

    if(platform == 'cordova'){
      cordova.init();
    }

  }

};
