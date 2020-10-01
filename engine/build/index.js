const check = require('./check');
const compile = require('./compiler');
const sass = require('./sass');
const edit = require('./edit');
const copy = require('./copy');
const make = require('./make');

async function init(base,is_outside){

  let help_message = 'base directory is the location where you store the vegana project files for example if the index is available at https://vegana.js/website1 please provide https://vegana.js/website1 as the base directory.';

  if(base === "help" || base === "--help" || base === "-h"){
    return common.info(help_message);
  }

  if(is_outside && !base){
    if(await input.confirm("do you need help with base directory")){
      return common.info(help_message);
    }
    if(await input.confirm("do you want to set custom base directory")){
      base = await input.text("please give a base directory where the vegana app will be avaibale");
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

  let doCheck = await check.init();
  if(doCheck == false){
    return common.error('check failed');
  }

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

  //make folders

  let doMake = await make.init();
  if(!doMake){
    return common.error('failed-make_build_folders');
  }

  //edit index

  let doEdit = await edit.init(base);
  if(!doEdit){
    return common.error('failed-process_index_file');
  }

  //copy built files

  let doCopy = await copy.init();
  if(!doCopy){
    return common.error('failed-process_built_files');
  }

  common.success("build finished");

  return true;

}

module.exports= {
  init:init
};
