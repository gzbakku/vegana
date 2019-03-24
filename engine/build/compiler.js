const cmd = require('../../cmd');
const common = require('../../common');
const fs = require('fs-extra');
const lazy = require('./lazy');
const sass = require('./sass');
const browserify = require('browserify');
const uglifyify = require('uglifyify');
const shell = require('shelljs');
const tinyify = require('tinyify');

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

  let currentDirectory = process.cwd() + '\\';

  //prod
  let
  readLocation = currentDirectory + 'compile.js',
  writeLocation = currentDirectory + 'js\\bundle.js';

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

    if(adb.globals){
      if(adb.globals.length){
        if(adb.globals.length > 0){
          let globals = adb.globals;
          for(var i=0;i<globals.length;i++){
            let hold = globals[i];
            //console.log(page);
            promises.push(compile(hold.read,hold.write));
          }
        }
      }
    }

    if(adb.pages){
      if(adb.pages.length){
        if(adb.pages.length > 0){
          let pages = adb.pages;
          for(var i=0;i<pages.length;i++){
            let page = pages[i];
            //console.log(page);
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

  common.tell('compiling app');

  let currentDirectory = process.cwd() + '\\';

  //test
  //let readLocation = './akku/compile.js',writeLocation = './akku/js/bundle.js';

  //prod
  let
  readLocation = currentDirectory + 'compile.js',
  writeLocation = currentDirectory + 'js\\bundle.js';

  let doCompile = await compile(readLocation,writeLocation);

  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  }

  return true;

}

async function appModule(type,parents,name){

  common.tell('compiling lazy module');

  let readLocation = null,writeLocation = null;

  let currentDirectory = process.cwd() + "\\";

  //test
  //let baseRead = './akku/app/pages/';
  //let baseWrite = './akku/js/pages/';

  //prod
  let baseRead = currentDirectory + 'app';
  let baseWrite = currentDirectory + 'js';

  if(
    parents.hasOwnProperty('page') == false ||
    parents.hasOwnProperty('cont') == false ||
    parents.hasOwnProperty('panel') == false
  ){
    return common.error('invalid-comp_parents');
  }

  if(type == 'global'){

    if(parents.global == null){
      return common.error('not_found-global_comp_name');
    }

    readLocation = baseRead + '\\globals\\' + parents['global'] + '\\globalComp.js';
    writeLocation = baseWrite + '\\globals\\' + parents['global'] + '\\globalComp.js';

  }

  if(type == 'page'){

    if(parents.page == null){
      return common.error('not_found-comp_parent_page');
    }

    readLocation = baseRead + '\\pages\\' + parents['page'] + '\\page.js';
    writeLocation = baseWrite + '\\pages\\' + parents['page'] + '\\page.js';
  }

  if(type == 'cont'){

    if(parents.page == null || parents.cont == null){
      return common.error('not_found-comp_parent_page/cont');
    }

    readLocation = baseRead + '\\pages\\' + parents['page'] + '\\conts\\' + parents['cont'] + '\\cont.js';
    writeLocation = baseWrite + '\\pages\\' + parents['page'] + '\\conts\\' + parents['cont'] + '\\cont.js';
  }

  if(type == 'panel'){

    if(parents.page == null || parents.cont == null || parents.panel == null){
      return common.error('not_found-comp_parent_page/cont/panel');
    }

    readLocation = baseRead + '\\pages\\' + parents['page'] + '\\conts\\' + parents['cont'] + '\\panels\\' + parents['panel'] + '\\panel.js';
    writeLocation = baseWrite + '\\pages\\' + parents['page'] + '\\conts\\' + parents['cont'] + '\\panels\\' + parents['panel'] + '\\panel.js';
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

  return new Promise((resolve,reject)=>{

    let writePath = makeBaseDir(writeLocation);
    browserify({ debug: false })
    .plugin(tinyify, { flat: false })
    .require(readLocation,{entry: true})
    .bundle()
    .on("error", (err)=>{
      let error = err.message;
      reject(error);
    })
    .on("end", ()=>{
      resolve();
    })
    .pipe(fs.createWriteStream(writeLocation));

  });

}

async function makeBaseDir(path){
  let array = path.split('\\');
  let location = null;
  for(var i=0;i<array.length - 1;i++){
    let key = array[i];
    if(location == null){
      location = key;
    } else {
      location = location + '\\' + key;
    }
  }
  //console.log(location);
  shell.mkdir('-p',location);
  return location;
}

async function compileOne(readLocation,writeLocation){

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
