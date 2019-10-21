const fs = require('fs-extra');
const currentDirectory = process.cwd() + '\\';

module.exports = {

  init:async ()=>{

    const cordova_dir_path = currentDirectory + 'cordova';
    const check_cordova_dir = await fs.pathExists(cordova_dir_path)
    .then((r)=>{
      return r;
    })
    .catch((e)=>{
      return false;
    });

    if(check_cordova_dir){
      return true;
    } else {
      return false;
    }

  }

};
