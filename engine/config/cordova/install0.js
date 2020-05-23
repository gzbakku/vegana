const fs = require('fs-extra');
const scriptAddressRef = process.argv[1];
const scriptMidPoint = scriptAddressRef.lastIndexOf('\\');
const appDirectory = scriptAddressRef.substring(0,scriptMidPoint)  + '\\cordova\\';
const currentDirectory = process.cwd() + '\\';

module.exports = {

  init:async ()=>{

    //read package
    const package_path = currentDirectory + 'package.json';
    const package = await fs.readJson(package_path)
    .then((j)=>{
      return j;
    })
    .catch((e)=>{
      return false;
    });
    if(!package){
      return common.error('failed-read_package');
    }

    //create cordova project
    const create_project_script = 'cordova create cordova vegana.cordova.' + package.name + ' ' + package.name;
    const create_project = await cmd.run(create_project_script);
    if(!create_project){
      return common.error('failed-create_cordova_project');
    }

    //delete www project
    const www_path = currentDirectory + 'cordova\\www';
    const remove_www = await fs.remove(www_path)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });

    if(!remove_www){
      return common.error('failed-remove_www_folder');
    }

    //make new www
    const create_www = await fs.ensureDir(www_path)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });

    if(!create_www){
      return common.error('failed-create_www_folder');
    }

    //copy the super html file
    const super_html_path = appDirectory + 'index.html';
    const new_html_path = currentDirectory + 'cordova\\www\\index.html';

    const copy = await fs.copy(super_html_path,new_html_path)
    .then(()=>{
      return true;
    })
    .catch((e)=>{
      common.error(e);
      return false;
    });

    if(!copy){
      return common.error('failed - generate cordova compatible html file');
    }

    return true;

  }

};
