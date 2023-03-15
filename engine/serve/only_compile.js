const common = require('../../common');
const check = require("./check");
const config = require("./config");
const snippets = require("./snippets");
const transform = require("./transform");
const compile = require("./compiler");
const sass = require("./sass");
const static = require("./static");
const sass_collect = require("../sass/collect/index");

module.exports = {
    init:init
};

async function init(enable_config_production){

  //check the files
  if(true){
    let doCheck = await check.init();
    if(doCheck == false){
      return common.error('check failed');
    }
  }

  //sass collect
  if(!await sass_collect.init(true)){
    return common.error('failed sass collect');
  }

  //config
  if(true){
    let config_customize = await config.init(enable_config_production);
    if(config_customize == false){
      return common.error('failed config customize');
    }
  }

  if(true){
    let static_verify = await static.verify();
    if(static_verify == false){
      return common.error('failed verify static files');
    }
  }

  if(true){
    let static_config = await static.init();
    if(static_config == false){
      return common.error('failed config static');
    }
  }

  //compile snippets here
  if(true){
    let compileSnippets = await snippets.init();
    if(compileSnippets == false){
      return common.error('failed collect snippets');
    }
  }

  //load snippets into mem
  if(true){
    let loadSnippets = await transform.load();
    if(loadSnippets == false){
      return common.error('failed load snippets');
    }
  }

  //transform all files in project
  if(true){
    let transformFiles = await transform.all_files();
    if(transformFiles == false){
      return common.error('failed transform files');
    }
  }

  //compile here
  if(true){
    let doCompile = await compile.init();
    if(doCompile == false){
      return common.error('failed-bundle_compilation');
    }
  }

  //compile lazy modules here
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

  return true;

}