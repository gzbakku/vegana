const fs = require('fs-extra');
const socket = require('./socket');
const common = require('../../common');
const compile = require('./compiler');
const chokidar = require('chokidar');
const sass = require('./sass');

let lazy = null;

function getDirectoryType(path){

  //common.tell('fetching module type');

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
}

function getParents(type,location){

  //common.tell('getting module parent doms');

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
      page:page,
      cont:cont,
      panel:panel
    };

  }


  if(type == 'sass'){

    let locationArray = location.split("\\");
    let nameString = locationArray[locationArray.indexOf('sass') + 1];
    let name = nameString.split('.')[0];

    return {
      page:null,
      cont:null,
      panel:null,
      sass:name
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
      page:page,
      cont:null,
      panel:null
    };

  }

}

function checkLaziness(type,parents){

  //common.tell('checking laziness');

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

async function init(){

  console.log('>>> starting watcher');

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
    common.tell('app updated');
    let moduleType = getDirectoryType(path);
    let parents = getParents(moduleType,path);
    let laziness = checkLaziness(moduleType,parents);
    if(laziness == true){
      let compileCheck = await compile.appModule(moduleType,parents);
    } else {
      let compileCheck = await compile.bundle();
    }
    common.tell('reloading vegana app');
    socket.reload();
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
  });

  let location_css = currentDirectory + 'css\\';

  chokidar.watch(location_css)
  .on('change',async (path)=>{
    common.tell('css updated');
    socket.reload();
  });

  return true;

}

module.exports = {
  init:init
};
