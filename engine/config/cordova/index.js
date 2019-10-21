//module
//const common = require('../../common');
//const cmd = require('../../cmd');

//workers
const compile = require('./compiler');
const sass = require('./sass');
const copy = require('./copy');
const make = require('./make');

const install_checker = require('./installer/check');
const install_installer = require('./installer/install');

const installer = {
  check:install_checker,
  install:install_installer
};

async function init(base){

  common.tell('configuring cordova');

  //check the files

  //compile bundle here

  let doCompile = await compile.init();
  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  }

  //compile lazy

  let doLazyLoad = await compile.lazyLoader();
  if(doLazyLoad == false){
    return common.error('failed-lazy_module_compilations');
  }

  //compile css here

  let doSassCompilation = await sass.init();
  if(doSassCompilation == false){
    return common.error('failed-master_sass_compilation');
  }

  //check cordova

  const check_cordova_installation = await install_checker.init();
  if(check_cordova_installation){
    common.error('please remove all cordova artifacts if you want to redo the cordova config.');
    return common.error('cordova-already_installed');
  }

  //install cordova

  const install_cordova = await install_installer.init();
  if(!install_cordova){
    return common.error('failed-install_cordova');
  }

  //copy built files

  let doCopy = await copy.init();
  if(!doCopy){
    return common.error('failed-process_built_files');
  }

}

module.exports= {
  init:init
};
