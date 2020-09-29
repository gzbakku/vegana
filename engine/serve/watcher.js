const fs = require('fs-extra');
const socket = require('./socket');
const common = require('../../common');
const compile = require('./compiler');
const chokidar = require('chokidar');
const sass = require('./sass');

let lazy = null;

function getDirectoryType(path){

  //common.tell('fetching module type');

  if(path.match('ui')){
    if(path.match('.scss')){
      return "scss";
    } else {
      return 'ui';
    }
  }
  if(path.match('wasm')){
    if(!path.match('src')){
      return false;
    }
    if(path.match('js')){
      return false;
    }
    return 'wasm';
  }
  if(path.match('globals')){
    return 'global';
  }
  if(path.match('panels')){
    return 'panel';
  }
  if(path.match('conts')){
    return 'cont';
  }
  if(path.match('pages')){
    return 'page';
  }
  if(path.match('sass')){
    return 'sass';
  }
  if(path.match('comp')){
    return 'comp';
  }
  if(path.match('app')){
    return 'app';
  }
  if(path.match('node_modules')){
    return 'node_modules';
  }
  if(path.match('assets')){
    return 'assets';
  }

}

function getParents(type,location){

  //common.tell('getting module parent doms');

  if(type === 'wasm'){

    let locationArray = location.split("\\");
    if(locationArray.indexOf('wasm') < 0){
      return common.error('not_found-app/wasm=>directory');
    }
    if(!locationArray[locationArray.indexOf('wasm') + 1]){
      return common.error('not_found-app/wasm/project=>directory');
    }

    let wasm = locationArray[locationArray.indexOf('wasm') + 1];

    return {
      wasm:wasm,
      global:null,
      page:null,
      cont:null,
      panel:null,
      ui:null,
    };

  }

  if(type == 'global'){

    let locationArray = location.split("\\");
    if(locationArray.indexOf('app') < 0){
      return common.error('not_found-app/pages/conts||directory');
    }

    let comp = locationArray[locationArray.indexOf('globals') + 1];

    return {
      global:comp,
      page:null,
      cont:null,
      panel:null,
      ui:null,
    };

  }

  if(type == 'panel'){

    let locationArray = location.split("\\");
    if(
      locationArray.indexOf('app') < 0 ||
      locationArray.indexOf('pages') < 0 ||
      locationArray.indexOf('conts') < 0
    ){
      return common.error('not_found-app/pages/conts||directory');
    }

    let page = locationArray[locationArray.indexOf('pages') + 1];
    let cont = locationArray[locationArray.indexOf('conts') + 1];
    let panel = locationArray[locationArray.indexOf('panels') + 1];

    return {
      global:null,
      page:page,
      cont:cont,
      panel:panel,
      ui:null,
    };

  }

  if(type == 'sass'){

    let locationArray = location.split("\\");
    let nameString = locationArray[locationArray.indexOf('sass') + 1];
    let name = nameString.split('.')[0];

    return {
      global:null,
      page:null,
      cont:null,
      panel:null,
      ui:null,
      sass:name
    };

  }

  if(type === "ui"){

    return {
      global:null,
      page:null,
      cont:null,
      panel:null,
      sass:null,
      ui:true
    };

  }

  if(type == 'cont'){

    let locationArray = location.split("\\");
    if(
      locationArray.indexOf('app') < 0 ||
      locationArray.indexOf('pages') < 0
    ){
      return common.error('not_found-app/pages||directory');
    }

    let pageIndex = locationArray.indexOf('pages');
    let page = locationArray[pageIndex + 1];
    let cont = locationArray[locationArray.indexOf('conts') + 1];

    return {
      global:null,
      page:page,
      cont:cont,
      panel:null
    };

  }

  if(type == 'page'){

    let locationArray = location.split("\\");
    if(locationArray.indexOf('app') < 0){
      return common.error('not_found-app_directory');
    }

    let pageIndex = locationArray.indexOf('pages');
    let page = locationArray[pageIndex + 1];

    return {
      global:null,
      page:page,
      cont:null,
      panel:null
    };

  }

}

function checkLaziness(type,parents){

  //common.tell('checking laziness');

  if(type === "global" || type === "wasm"){
    return true;
  }

  if(lazy == null){
    return common.error('not_loaded-lazy.json');
  }

  if(
    parents.hasOwnProperty('page') == false ||
    parents.hasOwnProperty('cont') == false ||
    parents.hasOwnProperty('panel') == false
  ){
    return common.error('invalid-parent_directories');
  }

  let bank = ['page','cont','panel','sass'];

  if(bank.indexOf(type) < 0){
    return common.error('invalid-comp_type');
  }

  if(type == 'sass'){
    if(lazy.hasOwnProperty('sass') == true){
      if(lazy.sass.indexOf(parents.sass) >= 0){
        return true;
      }
    }
    return false;
  }

  if(type == 'page'){
    if(lazy.hasOwnProperty('pages') == true){
      if(lazy.pages.indexOf(parents.page) >= 0){
        return true;
      }
    }
    return false;
  }
  if(type == 'cont'){
    if(lazy.hasOwnProperty(['conts']) == true){
      if(lazy.conts.hasOwnProperty([parents.page]) == true){
        if(lazy.conts[parents.page].indexOf(parents.cont) >= 0){
          return true;
        }
      }
    }
    return false;
  }
  if(type == 'panel'){
    if(lazy.hasOwnProperty(['panels']) == true){
      if(lazy['panels'].hasOwnProperty([parents.page]) == true){
        if(lazy.panels[parents.page].hasOwnProperty(parents.cont) == true){
          if(lazy.panels[parents.page][parents.cont].indexOf(parents.panel) >= 0){
            return true;
          }
        }
      }
    }
    return false;
  }

}

async function checkParentsLazyness(type,parents){

  if(typeof(parents) !== 'object'){
    return common.error('invalid-parents');
  }

  if(parents.panel !== null && type !== 'panel'){
    let lazyness = checkLaziness('panel',parents);
    if(lazyness == true){
      let compileCheck = await compile.appModule('panel',parents);
      if(compileCheck == true){
        common.tell('lazy panel updated');
      }
    }
    return true;
  }

  if(parents.cont !== null && type !== 'cont'){
    let lazyness = checkLaziness('cont',parents);
    if(lazyness == true){
      let compileCheck = await compile.appModule('cont',parents);
      if(compileCheck == true){
        common.tell('lazy cont updated');
      }
    }
    return true;
  }

  if(parents.page !== null && type !== 'page'){
    let lazyness = checkLaziness('page',parents);
    if(lazyness == true){
      let compileCheck = await compile.appModule('page',parents);
      if(compileCheck == true){
        common.tell('lazy page updated');
      }
    }
    return true;
  }

  return false;

}

async function init(){

  //test
  //let currentDirectory = process.cwd() + '\\akku\\';

  //prod
  let currentDirectory = process.cwd() + '\\';

  console.log('>>> fetching lazy.json');

  //getting lazy object
  let read = await fs.readFile(currentDirectory + "lazy.json",'utf-8')
  .then((data)=>{
    return data;
  })
  .catch((err)=>{
      console.log(err);
      return false;
  });

  if(read == false){
    return common.error('not_found-lazy.json');
  }

  if(!JSON.stringify(read)){
    return common.error('invalid-lazy.json');
  }

  lazy = JSON.parse(read);

  //watch index.html

  let location_index = currentDirectory + 'index.html';

  fs.watchFile(location_index,(curr)=>{
    common.tell('file updated => index.html');
    socket.reload();
  });

  //watch bundle.js

  let location_bundle = currentDirectory + 'app\\';

  chokidar.watch(location_bundle)
  .on('change',async (path)=>{

    let moduleType = getDirectoryType(path);

    if(moduleType){

      common.tell('app updated');
      common.tell(path);

      if(moduleType === "scss"){
        let compileCheck = await sass.compile.master();
        if(compileCheck){
          socket.reload();
        }
        return true;
      }

      if(moduleType === 'app' || moduleType === "ui"){
        let compileCheck = await compile.bundle();
        socket.reload();
        return true;
      }

      let parents = getParents(moduleType,path);
      let laziness = checkLaziness(moduleType,parents);

      if(moduleType === "wasm"){
        let compileCheck = await compile.wasm(parents);
      } else {
        if(laziness === true){
          let compileCheck = await compile.appModule(moduleType,parents);
        } else {
          let compileCheck = await compile.bundle();
        }
      }

      let checkLazyParents = await checkParentsLazyness(moduleType,parents);

      socket.reload();

    }

  });

  //watch master.css

  let location_sass = currentDirectory + 'sass\\';

  chokidar.watch(location_sass)
  .on('change',async (path)=>{
    common.tell('sass edited');
    let moduleType = getDirectoryType(path);
    let parents = getParents(moduleType,path);
    let laziness = checkLaziness(moduleType,parents);
    if(laziness == true){
      let compileCheck = await sass.compile.lazyModule(parents.sass);
    } else {
      let compileCheck = await sass.compile.master();
    }
    //socket.reload();
  });

  //css

  let location_css = currentDirectory + 'css\\';

  chokidar.watch(location_css)
  .on('change',async (path)=>{
    common.tell('css updated');
    socket.reload();
  });

  //assets

  let location_assets = currentDirectory + 'assets\\';

  chokidar.watch(location_assets)
  .on('change',async (path)=>{
    common.tell('assets updated');
    socket.reload();
  });

  //node_modules

  let location_node_modules = currentDirectory + 'node_modules\\';

  chokidar.watch(location_node_modules)
  .on('change',async (path)=>{
    common.tell('node_modules updated');
    let compileCheck = await compile.bundle();
    socket.reload();
  });

  //vega

  let location_vega = currentDirectory + 'vega\\';

  chokidar.watch(location_vega)
  .on('change',async (path)=>{
    common.tell('node_modules updated');
    let compileCheck = await compile.bundle();
    socket.reload();
  });

  //compile

  let location_compile_config = currentDirectory + 'compile.js';

  chokidar.watch(location_compile_config)
  .on('change',async (path)=>{
    common.tell('compile_config updated');
    let compileCheck = await compile.bundle();
    socket.reload();
  });

  return true;

}

module.exports = {
  init:init
};
