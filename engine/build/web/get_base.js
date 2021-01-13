module.exports = {

  init:async ()=>{
    const packagePath = io.dir.cwd() + "/package.json";
    if(!await io.exists(packagePath)){
      return common.error('failed-read-package.json => ' + packagePath);
    }
    const package = require(packagePath);
    if(package.hasOwnProperty("vegana_web_base_url")){
      return package.vegana_web_base_url;
    } else if(package.hasOwnProperty("base_directory")){
      return package.base_directory;
    } else {
      return false;
    }
  },

  new_base:async (base)=>{
    let read = await io.package.read();
    if(!read){
      return common.error("failed to read package.json");
    }
    read.vegana_web_base_url = base;
    if(!await io.package.write(read)){
      return common.error("failed update package.json");
    } else {return true;}
  }

};
