const copy = require('./copy');
const install = require('./install')

async function init(base){

  common.tell('configuring cordova');

  //compile bundle here

  if(true){
    let do_build = await build_api.init();
    if(do_build == false){
      return common.error('failed-build_app');
    }
  }

  //check cordova

  if(true){
    const cordova_dir_path = io.dir.cwd() + '\\cordova';
    if(await io.exists(cordova_dir_path)){
      await copy.copy_initiater();
      common.error('please remove all cordova artifacts if you want to redo the cordova config.');
      return common.error('cordova-already_installed');
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
    let doCopy = await copy.init();
    if(!doCopy){
      return common.error('failed-process_built_files');
    }
  }

}

module.exports= {
  init:init
};
