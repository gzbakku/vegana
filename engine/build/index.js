//module
const common = require('../../common');
const cmd = require('../../cmd');

//workers
const check = require('./check');
const compile = require('./compiler');
const sass = require('./sass');
const edit = require('./edit');
const copy = require('./copy');
const make = require('./make');

async function init(base){

  console.log('>>> build initiated');

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

}

module.exports= {
  init:init
};
