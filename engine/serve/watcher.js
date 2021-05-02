const fs = require('fs-extra');
const socket = require('./socket');
const compile = require('./compiler');
const chokidar = require('chokidar');
const sass = require('./sass');
const workers = require("./watcher_workers");
const class_worker = require("./watcher_class_worker");
// const common = require('../../common');

let lazy = null;

function getDirectoryType(path){

  //common.tell('fetching module type');

  if(path.match('sass')){
    return 'sass';
  }
  if(path.match(".scss")){
    return "scss";
  }
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

  let splitter = '\\';
  if(location.indexOf("/") >= 0){
    splitter = '/';
  }

  //common.tell('getting module parent doms');

  if(type === 'wasm'){

    let locationArray = location.split(splitter);
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

    let locationArray = location.split(splitter);
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

    let locationArray = location.split(splitter);
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

    let locationArray = location.split(splitter);
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

    let locationArray = location.split(splitter);
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

    let locationArray = location.split(splitter);
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

  let currentDirectory = await io.dir.cwd();
  currentDirectory += "/"

  common.tell('>>> fetching lazy.json');
  lazy = await io.lazy.read();
  if(!lazy){
    return common.error("failed-read_lazy_book");
  }

  // watch lazy.json
  let location_lazy_json = currentDirectory + 'lazy.json';
  chokidar.watch(location_lazy_json)
  .on('change',async (_)=>{
    let read = await io.lazy.read();
    if(read){
      common.tell("lazy.json updated");
      lazy = read;
      socket.reload();
    }
  });

  //watch index.html
  let location_index = currentDirectory + 'index.html';
  fs.watchFile(location_index,(curr)=>{
    common.tell('file updated => index.html');
    socket.reload();
  });

  //watch bundle.js
  let location_bundle = currentDirectory + 'app/';
  chokidar.watch(location_bundle)
  .on('change',async (path)=>{

    path = io.clean_path(path);

    let location = workers.get_location(path);
    let file_type = workers.get_file_type(path);
    let parents = workers.get_parents(path);
    let module_type = workers.get_module_type(path);
    let lazy_parent = workers.get_lazy_parent(module_type,parents,lazy);
    let parent = lazy_parent.name?lazy_parent.name:lazy_parent.type;
    let name = parents[module_type]?parents[module_type]:module_type;

    // console.log("\n");
    // console.log({file_type:file_type,lazy_parent:lazy_parent});
    // console.log("\n");

    if(file_type === "js"){
      class_worker(path,module_type);
    }

    if(file_type){
      common.tell('compiling : ' + file_type + " => " + name + " => " + parent);
      common.tell("path : " + path);
    }

    async function compile_sass_bundle(){
      if(await sass.compile.master()){socket.reload();}
    }
    async function compile_js_bundle(){
      if(await compile.bundle()){socket.reload();}
    }

    if(file_type === "js"){
      if(location === "ui" || lazy_parent.type === "app"){
        return await compile_js_bundle();
      } else {
        if(await compile.appModule(lazy_parent.type,parents)){
          socket.reload();
        }
      }
    } else if(file_type === "sass"){
      let sass_type = workers.get_sass_type(path);
      // console.log({sass_type:sass_type});
      if(sass_type === "tree"){
        return await compile_sass_bundle();
      } else if(sass_type === "included"){
        if(location === "ui" || lazy_parent.type === "app"){
          return await compile_sass_bundle();
        } else {
          return await workers.compile_lazy_sass(lazy_parent,parents,path);
        }
      } else if(sass_type === "lazy"){
        return await workers.compile_lazy_sass(lazy_parent,parents,path);
      }
    } else if(file_type === "wasm"){
      await compile.wasm(parents);
    }

  });

  //watch master.css
  let location_sass = currentDirectory + 'sass/';
  chokidar.watch(location_sass)
  .on('change',async (path)=>{
    path = io.clean_path(path);
    if(path.indexOf("/sass/sassPack/") >= 0){return;}
    common.tell('sass edited');
    if(await sass.compile.master()){socket.reload();}
  });

  //watch sassPack
  let location_sass_pack = currentDirectory + "sass/sassPack/"
  if(!await io.exists(location_sass_pack)){
    if(!await io.dir.ensure(location_sass_pack)){return common.error("failed-make-location_sass_pack");}
  }
  chokidar.watch(location_sass_pack)
  .on('change',async (path)=>{
    common.tell('sass pack updated');
    path = io.clean_path(path);
    if(await workers.extract_sass_pack(path)){
      socket.reload();
    }
  });

  //css
  let location_css = currentDirectory + 'css/';
  chokidar.watch(location_css)
  .on('change',async (path)=>{
    common.tell('css updated');
    socket.reload();
  });

  //assets
  let location_assets = currentDirectory + 'assets/';
  chokidar.watch(location_assets)
  .on('change',async (path)=>{
    common.tell('assets updated');
    socket.reload();
  });

  //node_modules
  let location_node_modules = currentDirectory + 'node_modules/';
  chokidar.watch(location_node_modules)
  .on('change',async (path)=>{
    common.tell('node_modules updated');
    let compileCheck = await compile.bundle();
    socket.reload();
  });

  //vega
  let location_vega = currentDirectory + 'vega/';
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
