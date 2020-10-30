const check = require('./check');
const compile = require('./compiler');
const sass = require('./sass');
const edit = require('./edit');
const copy = require('./copy');
const make = require('./make');
const get_base = require('./get_base');

async function init(base,no_base){

  let help_message = 'base directory is the location where you store the vegana project files for example if the index is available at https://vegana.js/website1 please provide https://vegana.js/website1 as the base directory.';

  if(!no_base){
    if(!base){
      base = await get_base.init();
    }
    if(!base){
      if(await input.confirm("do you need help with base directory")){
        return common.info(help_message);
      }
      base = await input.text("please give a base directory where the vegana app will be available");
    }
  }

  common.tell('build initiated');

  if(base){
    if(base[base.length - 1] === "/"){
      base = base.slice(0,-1);
    }
  } else {
    base = '';
  }

  //check the files

  if(true){
    let doCheck = await check.init();
    if(doCheck == false){
      return common.error('check failed');
    }
  }

  //compile bundle here

  if(true){
    let doCompile = await compile.init();
    if(doCompile == false){
      return common.error('failed-bundle_compilation');
    }
  }

  //compile lazy

  if(true){
    let doLazyLoad = await compile.lazyLoader();
    if(doLazyLoad == false){
      return common.error('failed-lazy_module_compilations');
    }
  }

  //compile css here

  if(true){
    let doSassCompilation = await sass.init();
    if(doSassCompilation == false){
      return common.error('failed-master_sass_compilation');
    }
  }

  //make folders

  if(true){
    let doMake = await make.init();
    if(!doMake){
      return common.error('failed-make_build_folders');
    }
  }

  //edit index

  if(true){
    let doEdit = await edit.init(base);
    if(!doEdit){
      return common.error('failed-process_index_file');
    }
  }

  //copy built files

  if(true){
    let doCopy = await copy.init();
    if(!doCopy){
      return common.error('failed-process_built_files');
    }
  }

  common.success("build finished");

  return true;

}

module.exports= {
  init:init
};