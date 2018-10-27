const cmd = require('../../cmd');
const common = require('../../common');
const fs = require('fs-extra');
const lazy = require('./lazy');
const sass = require('./sass');

module.exports = {
  init:init,
  bundle:bundle,
  appModule:appModule,
  lazyLoader:lazyLoader
};

async function init(){

  console.log('>>> compiling app');

  //test
  //let readLocation = './akku/compile.js',writeLocation = './akku/js/bundle.js';

  //prod
  let readLocation = './compile.js',writeLocation = './js/bundle.js';

  let doCompile = await compile(readLocation,writeLocation);

  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  }

  return true;

}

async function lazyLoader(){

  return new Promise(async (resolve,reject)=>{

    console.log('>>> compiling lazy modules');

    let adb = await lazy.getAllModules(); //adb = address book

    if(adb == false){
      return common.error('compiler_failed-lazy_loader');
    }

    let promises = [];

    if(adb.pages){
      if(adb.pages.length){
        if(adb.pages.length > 0){
          let pages = adb.pages;
          for(var i=0;i<pages.length;i++){
            let page = pages[i];
            promises.push(compile(page.read,page.write));
          }
        }
      }
    }

    if(adb.conts){
      if(adb.conts.length){
        if(adb.conts.length > 0){
          let conts = adb.conts;
          for(var i=0;i<conts.length;i++){
            let cont = conts[i];
            promises.push(compile(cont.read,cont.write));
          }
        }
      }
    }

    if(adb.panels){
      if(adb.panels.length){
        if(adb.panels.length > 0){
          let panels = adb.panels;
          for(var i=0;i<panels.length;i++){
            let panel = panels[i];
            promises.push(compile(panel.read,panel.write));
          }
        }
      }
    }

    if(adb.sass){
      if(adb.sass.length){
        if(adb.sass.length > 0){
          let scsses = adb.sass;
          for(var i=0;i<scsses.length;i++){
            let scss = scsses[i];
            promises.push(sass.render(scss.read,scss.write));
          }
        }
      }
    }

    Promise.all(promises)
    .then((results)=>{
      resolve(true);
    })
    .catch((error)=>{
      common.error(error);
      reject(false);
    });

  });

}

async function bundle(){

  common.tell('>>> compiling app');

  //test
  //let readLocation = './akku/compile.js',writeLocation = './akku/js/bundle.js';

  //prod
  let readLocation = './compile.js',writeLocation = './js/bundle.js';

  let doCompile = await compile(readLocation,writeLocation);

  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  }

  return true;

}

async function appModule(type,parents,name){

  common.tell('compiling lazy module');

  let readLocation = null,writeLocation = null;

  //test
  //let baseRead = './akku/app/pages/';
  //let baseWrite = './akku/js/pages/';

  //prod
  let baseRead = './app/pages/';
  let baseWrite = './js/pages/';

  if(
    parents.hasOwnProperty('page') == false ||
    parents.hasOwnProperty('cont') == false ||
    parents.hasOwnProperty('panel') == false
  ){
    return common.error('invalid-comp_parents');
  }

  if(type == 'sass'){

    if(parents.page == null){
      return common.error('not_found-comp_parent_page');
    }

    readLocation = baseRead + parents['page'] + '/page.js';
    writeLocation = baseWrite + parents['page'] + '/page.js';
  }
  if(type == 'page'){

    if(parents.page == null){
      return common.error('not_found-comp_parent_page');
    }

    readLocation = baseRead + parents['page'] + '/page.js';
    writeLocation = baseWrite + parents['page'] + '/page.js';
  }
  if(type == 'cont'){

    if(parents.page == null || parents.cont == null){
      return common.error('not_found-comp_parent_page/cont');
    }

    readLocation = baseRead + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
    writeLocation = baseWrite + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
  }
  if(type == 'panel'){

    if(parents.page == null || parents.cont == null || parents.panel == null){
      return common.error('not_found-comp_parent_page/cont/panel');
    }

    readLocation = baseRead + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
    writeLocation = baseWrite + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
  }

  if(
    readLocation == null ||
    writeLocation == null
  ){
    return common.error('invalid-comp_type');
  }

  let doCompile = await compile(readLocation,writeLocation);

  if(doCompile == false){
    return common.error('failed-lazy_module_compilation');
  }

  return true;

}

async function compile(readLocation,writeLocation){

  let runFile = {
    command : 'browserify',
    argv : [
      readLocation,
      '-o',
      writeLocation
    ]
  };

  //console.log(toRun);

  let buildBundle = await cmd.runFile(runFile.command,runFile.argv)
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    console.log(err);
    return false;
  },(stderr)=>{
    console.log(stderr);
    return false;
  });

  //console.log(buildBundle);

  if(buildBundle == false){
    return common.error('failed-broswerify_compiler');
  }

  return true;

}
