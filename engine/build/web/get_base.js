module.exports = {

  init:async ()=>{
    const packagePath = io.dir.cwd() + "/package.json";
    if(!await io.exists(packagePath)){
      return common.error('failed-read-package.json => ' + packagePath);
    }
    const package = require(packagePath);
    if(package.hasOwnProperty("vegana_web_base_url")){
      return package.vegana_web_base_url;
    } else {
      return false;
    }
  }

};
