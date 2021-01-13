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
  lazyLoader:lazyLoader,
  wasm:compile_wasm
};

async function init(){
  console.log('>>> compiling app');
  let currentDirectory = await io.dir.cwd(),
  readLocation = currentDirectory + '/compile.js',
  writeLocation = currentDirectory + '/js/bundle.js',
  doCompile = await compile(readLocation,writeLocation);
  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  } else {return true;}
}

async function lazyLoader(){

  return new Promise(async (resolve,reject)=>{

    console.log('>>> compiling lazy modules');

    let adb = await lazy.getAllModules(); //adb = address book
    if(!adb){return common.error('compiler_failed-lazy_loader');}

    let promises = [];
    if(adb.sass && adb.sass.length > 0){
      for(let sassPack of adb.sass){
        promises.push(sass.render(sassPack.read,sassPack.write));
      }
    }
    if(adb.globals && adb.globals.length > 0){
      for(let global of adb.globals){
        promises.push(compile(global.read,global.write,global.sassRead,global.sassWrite));
      }
    }
    if(adb.pages && adb.pages.length > 0){
      for(let page of adb.pages){
        promises.push(compile(page.read,page.write,page.sassRead,page.sassWrite));
      }
    }
    if(adb.conts && adb.conts.length > 0){
      for(let cont of adb.conts){
        promises.push(compile(cont.read,cont.write,cont.sassRead,cont.sassWrite));
      }
    }
    if(adb.panels && adb.panels.length > 0){
      for(let panel of adb.panels){
        promises.push(compile(panel.read,panel.write,panel.sassRead,panel.sassWrite));
      }
    }
    if(adb.wasm && adb.wasm.length > 0){
      for(let wasmModule of adb.wasm){
        promises.push(compile_wasm(wasmModule));
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

async function compile_wasm(locations){

  common.tell("compiling wasm project : " + locations.app);

  let app_dir = locations.read;
  let out_dir = locations.write;
  let script = 'wasm-pack build ' + locations.read  + ' --target no-modules --out-name index';

  const run = await cmd.run(script)
  .then(()=>{
    common.tell("wasm project compiled : " + locations.app);
    return true;
  }).catch((e)=>{
    console.log(e);
    return common.error("failed-wasm-pack-build");
  });

  if(!run){return false;}

  let cwd = io.dir.cwd();
  await io.dir.ensure(cwd + "/js/");
  await io.dir.ensure(cwd + "/js/wasm/");
  await io.dir.ensure(cwd + "/js/wasm/" + locations.app + "/");

  //*******************
  //copy wrapper

  let from = app_dir + "/pkg/index.js"
  let to = out_dir + "/wrapper.js";

  let read = await io.read(from);
  if(!read){
    return common.error("failed-read_wasm_wrapper-build");;
  }
  let custom_was_controller = locations.app + '_wasm_controller'

  read = read.replace("wasm_bindgen = Object.assign(init, __exports);",custom_was_controller +" = Object.assign(init, __exports);");
  read = read.replace("let wasm_bindgen;","let " + custom_was_controller + ";");

  let write = await io.write(to,read);
  if(!write){
    return common.error("failed-write_wasm_wrapper-build");;
  }

  //*******************
  //copy wasm

  from = app_dir + "/pkg/index_bg.wasm";
  to = out_dir + "/index.wasm";
  let do_copy_wasm = await io.copy(from,to);
  if(!do_copy_wasm){
    return common.error("failed-do_copy_wasm-build");
  }

  return true;

}

async function bundle(){
  common.tell('compiling app');
  let currentDirectory = await io.dir.cwd() + '/',
  readLocation = currentDirectory + 'compile.js',
  writeLocation = currentDirectory + 'js/bundle.js',
  doCompile = await compile(readLocation,writeLocation);
  if(doCompile == false){
    return common.error('failed-bundle_compilation');
  } else {return true;}
}

async function appModule(type,parents,name){

  common.tell('compiling lazy module');

  let readLocation = null,writeLocation = null;
  let currentDirectory = await io.dir.cwd() + "/";
  let baseRead = currentDirectory + 'app/';
  let baseWrite = currentDirectory + 'js/';

  if(
    parents.hasOwnProperty('page') == false ||
    parents.hasOwnProperty('cont') == false ||
    parents.hasOwnProperty('panel') == false
  ){
    return common.error('invalid-comp_parents');
  }

  // if(type == 'sass'){
  //   if(!parents.page){return common.error('not_found-comp_parent_page');}
  //   readLocation = baseRead + 'pages/' + parents['page'] + '/page.js';
  //   writeLocation = baseWrite + 'pages/'  + parents['page'] + '/page.js';
  // }
  if(type == 'page'){
    if(parents.page){return common.error('not_found-comp_parent_page');}
    readLocation = baseRead + 'pages/'  + parents['page'] + '/page.js';
    writeLocation = baseWrite + 'pages/'  + parents['page'] + '/page.js';
  } else if(type == 'cont'){
    if(!parents.page || !parents.cont){return common.error('not_found-comp_parent_page/cont');}
    readLocation = baseRead + 'pages/'  + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
    writeLocation = baseWrite + 'pages/'  + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
  } else if(type == 'panel'){
    if(!parents.page || !parents.cont || !parents.panel){return common.error('not_found-comp_parent_page/cont/panel');}
    readLocation = baseRead + 'pages/'  + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
    writeLocation = baseWrite + 'pages/'  + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
  } else if(type == 'global'){
    if(!parents.global){return common.error('not_found-global_comp');}
    readLocation = baseRead + 'globals/'  + parents['global'] + '/globalComp.js';
    writeLocation = baseWrite + 'globals/'  + parents['global'] + '/globalComp.js';
  }

  if(!readLocation || !writeLocation){return common.error('invalid-comp_type');}
  let doCompile = await compile(readLocation,writeLocation);
  if(doCompile == false){
    return common.error('failed-lazy_module_compilation');
  } else {return true;}

}

async function compile(readLocation,writeLocation,sassRead,sassWrite){

  return new Promise(async (resolve,reject)=>{

    if(await io.exists(sassRead)){
      const compile_sass = await sass.render(sassRead,sassWrite)
      .then(()=>{return true;}).catch(()=>{return false;});
      if(!compile_sass){
        reject("failed-sass_compile");
      }
    }

    if(!await io.exists(writeLocation)){
      if(!await makeBaseDir(writeLocation)){
        common.error("failed-make_base_dir");
        reject("failed-make_base_dir");
      }
    }

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
  let collect = '',hold = io.clean_path(path).split("/")
  for(let i=0;i<hold.length-1;i++){
    collect += hold[i] + "/";
  }
  if(!await io.dir.ensure(collect)){return false} else {return collect;}
}