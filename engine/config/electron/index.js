const copy = require('./copy');
const install = require('./install');

async function init(base){

  common.tell('configuring electron');

  //install electron
  const do_install = await install.init();
  if(!do_install){
    common.error('failed-install_electron');
  }

  //copy base files
  const do_copy = await copy.init();
  if(!do_copy){
    return common.error('failed-copy_electron_files');
  }

}

module.exports= {
  init:init
};
