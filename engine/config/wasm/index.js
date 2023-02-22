const install = require('./install');
const make_dir = require('./make_dir');

async function init(base){

  common.tell('configuring wasm');

  //install wasm apps
  const do_install = await install.init();
  if(!do_install){
    common.error('failed-do_install-wasm');
  }

  //make wasm dir
  const do_make_dir = await make_dir();
  if(!do_make_dir){
    common.error('failed-do_make_dir-wasm');
  }

  common.success("wasm configured");

}

module.exports= {
  init:init
};
