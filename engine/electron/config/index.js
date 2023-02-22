const copy = require('./copy');
const edit = require('./edit');
const install = require('./install');

async function init(base){

  common.tell('configuring electron');

  //install electron
  if(true){
    const do_install = await install.init();
    if(!do_install){
      common.error('failed-install_electron');
    }
  }

  //copy base files
  if(true){
    const do_copy = await copy.init();
    if(!do_copy){
      return common.error('failed-copy_electron_files');
    }
  }

  if(true){
    const do_edit = await edit.init();
    if(!do_edit){
      common.error('failed-do_edit');
    }
  }

  common.tell("you can now start developing the app by serveing the electron app in dev mode by command ");
  common.tell("$ vegana serve electron");
  common.tell("you have to press enter if you want to reset the electron app");
  common.tell("to be efficient and fast use simple browser for ui dev and only use electron serve to adjust electron main process");

  console.log();

  common.tell("electron main process is called inside electro.js file edit your main process here");

  console.log();

  common.tell("electronRun.js file is used by vegana cli to interact with electron apis, you dont need to edit this file");

  console.log();

  common.tell("please configure electronBuilder.js file for build instructions for your platform. we use electron builder to build the electron app you can find instructions to configure at there website at");
  common.tell("https://www.electron.build/");

  console.log();

  common.tell("please replace the logo image whereever you can find one the image has to be minimum 256x256 in dimensions if build is failing");

  console.log();

  common.success("electron configured");

}

module.exports= {
  init:init
};
