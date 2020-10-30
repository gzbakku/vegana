const install = require('./install');
const copy = require('./copy');

async function init(base){

  common.tell('configuring cordova');

  //compile bundle here

  if(true){
    let do_build = await build_api.init('',true);
    if(do_build == false){
      return common.error('failed-build_app');
    }
  }

  //check cordova
  const cordova_dir_path = io.dir.cwd() + '/cordova';
  if(true){
    if(await io.exists(cordova_dir_path)){
      await copy.init();
      common.error('please remove all cordova artifacts if you want to redo the cordova config.');
      return common.error('cordova-already_installed');
    } else {
      // if(!await io.dir.ensure(cordova_dir_path)){
      //   return common.error('failed-generate-cordova_directory');
      // }
      // if(!await copy.init()){
      //   return common.error('failed-generate-cordova_executor');
      // }
    }
  }

  //install cordova

  if(true){
    const install_cordova = await install.init();
    if(!install_cordova){
      return common.error('failed-install_cordova');
    }
  }

  //copy built files

  if(true){
    let doCopy = await copy_build_to_cordova.init();
    if(!doCopy){
      return common.error('failed-process_built_files');
    }
  }

  if(true){
    let makeExecutor = await copy.init();
    if(!makeExecutor){
      return common.error('failed-generate-cordova_executor');
    }
  }

}

module.exports= {
  init:init
};
