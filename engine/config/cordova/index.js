const install = require('./install');
const platform = require('./platform');
const copy = require('./copy');

async function init(base){

  common.tell('configuring cordova');

  //compile bundle here

  if(true){
    common.tell("building project");
    let do_build = await build_api.init('',true);
    if(do_build == false){
      return common.error('failed-build_app');
    }
  }

  //check cordova
  const cordova_dir_path = io.dir.cwd() + '/cordova';
  if(true){
    common.tell("checking cordova artifacts");
    if(await io.exists(cordova_dir_path)){
      await copy.init();
      common.error('please remove all cordova artifacts if you want to redo the cordova config.');
      return common.error('cordova-already_installed');
    }
  }

  //install cordova
  if(true){
    common.tell("installing cordova");
    const install_cordova = await install.init();
    if(!install_cordova){
      return common.error('failed-install_cordova');
    }
  }

  //config cordova platform
  if(true){
    common.tell("configuring cordova platforms");
    const config_platforms = await platform.init();
    if(!config_platforms){
      return common.error('failed-config_platforms');
    }
  }

  //copy built files
  if(true){
    common.tell("transferring vegana files to cordova");
    let doCopy = await copy_build_to_cordova.init();
    if(!doCopy){
      return common.error('failed-process_built_files');
    }
  }

  if(true){
    common.tell("generating executer");
    let makeExecutor = await copy.init();
    if(!makeExecutor){
      return common.error('failed-generate-cordova_executor');
    }
  }

  if(true){
    const cwd = await io.dir.cwd();
    const cordovaIgnorePath = cwd + "/cordova/.gitignore";
    if(await io.exists(cordovaIgnorePath)){
      if(!await io.delete(cordovaIgnorePath)){
        common.error("failed to remove gitignore file from cordova dir no worries you can do it manually yourself.");
      }
    }
  }

  common.success("cordova configured");

}

module.exports= {
  init:init
};
