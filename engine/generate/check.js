const fs = require('fs-extra');
const common = require('../../common');

module.exports = {

  init : async function(type,name){

    common.tell('checking container directory');

    //let currentDirectory = process.cwd() + '\\akku\\';  //test address
    let currentDirectory = process.cwd() + '\\';

    let containerBank = {
      page:'pages\\',
      cont:'conts\\',
      comp:'comps\\',
      globalComp:'globals\\',
      panel:'panels\\',
      wasm:'wasm\\',
      sass:''
    };

    let containerTag = {
      page:'Page',
      cont:'Cont',
      comp:'Comp',
      globalComp:'Comp',
      panel:'Panel',
      wasm:'',
      sass:''
    };

    let currentContainer = containerBank[type];
    let containerLocation = currentDirectory + currentContainer;
    let compLocation;
    if(type == 'sass'){
      compLocation = currentDirectory;
    } else {
      compLocation = containerLocation + name + containerTag[type] + '\\';
    }

    //check comp parents
    let checkParents = await checkCompParents(type,currentDirectory);
    if(checkParents == false){
      return common.error('invalid-project_directory');
    }

    //check comp parent directories here
    let expo = checkParents;

    //check if the parent container directory exists
    if(type !== 'sass' && type !== 'wasm'){
      if(!fs.existsSync(containerLocation)){
        let makecd = await makeContainerDirectory(containerLocation);
        if(makecd == false){
          return  common.error('make_container_directory failed');
        }
      }
    }

    if(type !== 'sass' && type !== 'wasm'){
      //check if the comp dirextory exist in the comp container
      if(fs.existsSync(compLocation)){
        return  common.error('component : ' + containerTag[type] + ' with name of : ' + name + ' already exists in the container directory');
      }
      //make comp directory if it doent exists
      if(!fs.existsSync(compLocation)){
        let makecd = await makeCompDirectory(compLocation);
        if(makecd == false){
          return  common.error('make_comp_directory failed');
        }
      }

    }

    if(type == 'sass'){
      //check if sass file exist in the directory
      if(fs.existsSync(compLocation + name + '.scss')){
        return  common.error('sass file with name of ' + name + ' already exists in the sass directory');
      }
    }

    let bool = {
      container:containerLocation,
      location:compLocation,
      page:expo['page'],
      cont:expo['cont'],
      panel:expo['panel']
    };

    return bool;

  }

};

async function makeContainerDirectory(containerLocation){

  //make container directory

  common.tell('making container directory');

  let create = await fs.mkdir(containerLocation)
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    return common.error(err);
  });

  return create;

}

async function makeCompDirectory(compLocation){

  //make comp directory

  common.tell('making comp directory');

  let create = await fs.mkdir(compLocation)
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    return common.error(err);
  });

  return create;

}

async function checkCompParents(type,location){

  if(type == 'sass'){

    let locationArray = location.split("\\");
    if(locationArray.indexOf('sass') < 0){
      return common.error('not_found-sass_directory');
    }

    return {
      page:null,
      cont:null,
      panel:null
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

    return {
      page:page,
      cont:cont,
      panel:null
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

    return {
      page:page,
      cont:null,
      panel:null
    };

  }

  if(type == 'page'){

    let locationArray = location.split("\\");
    if(locationArray.indexOf('app') < 0){
      return common.error('not_found-app_directory');
    }

    return {
      page:null,
      cont:null,
      panel:null
    };

  }

  if(type == 'comp'){
    return {
      page:null,
      cont:null,
      panel:null
    };
  }

  if(type == 'globalComp'){

    let locationArray = location.split("\\");
    if(
      locationArray.indexOf('app') < 0 ||
      locationArray.indexOf('pages') > 0 ||
      locationArray.indexOf('conts') > 0 ||
      locationArray.indexOf('panels') > 0
    ){
      return common.error('global comps can only be generated in app directory');
    }

    let page = locationArray[locationArray.indexOf('pages') + 1];
    let cont = locationArray[locationArray.indexOf('conts') + 1];

    return {
      page:page,
      cont:cont,
      panel:null
    };

  }

  if(type == 'wasm'){

    let locationArray = location.split("\\");
    if(
      locationArray.indexOf('app') < 0 ||
      locationArray.indexOf('wasm') < 0
    ){
      return common.error('wasm comps can only be generated in wasm directory nested inside of the app directory');
    }

    return {
      page:null,
      cont:null,
      panel:null
    };

  }

  return common.error('invalid-comp_type');

}
