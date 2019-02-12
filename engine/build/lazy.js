const common = require('../../common');
const fs = require('fs-extra');

//test
//const currentDirectory = process.cwd() + '//akku//';
//const baseRead = './akku/app/pages/';
//const baseWrite = './akku/js/pages/';

//prod
const currentDirectory = process.cwd() + '\\';
const baseRead = currentDirectory + 'app\\pages\\';
const baseWrite = currentDirectory + 'js\\pages\\';


module.exports = {
  getAllModules:getAllModules,
  getModuleAddress:getModuleAddress
};

async function getAllModules(){

  console.log('>>> fetching lazy modules');

  let read = await fs.readFile(currentDirectory + '\\lazy.json','utf-8')
  .then((data)=>{
    return data;
  })
  .catch((err)=>{
      console.log(err);
      return false;
  });

  if(read == false){
    return common.error('read_failed-lazy.json');
  }

  let bool = JSON.parse(read);

  let exp = {
    pages:[],
    conts:[],
    panels:[],
    sass:[]
  };

  let i,t,p,m,s,c;                        //for_loop operators
  let pages,page,conts,cont,panels,panel; //for_loop vars

  if(bool.pages){
    if(bool.pages.length){
      if(bool.pages.length > 0){
        pages = bool.pages;
        for(i=0;i<pages.length;i++){
          page = pages[i];
          exp.pages.push(getModuleAddress('page',{page:page,cont:null,panel:null}));
        }
      }
    }
  }

  if(bool.conts){
    if(Object.keys(bool.conts).length > 0){
      pages = Object.keys(bool.conts);
      for(i=0;i<pages.length;i++){
        page = pages[i];
        conts = bool.conts[page];
        for(m=0;m<conts.length;m++){
          cont = conts[m];
          exp.conts.push(getModuleAddress('cont',{page:page,cont:cont,panel:null}));
        }
      }
    }
  }

  if(bool.panels){
    if(Object.keys(bool.panels).length > 0){
      pages = Object.keys(bool.panels);
      for(p=0;p<pages.length;p++){
        page = pages[p];
        conts = Object.keys(bool.panels[page]);
        for(m=0;m<conts.length;m++){
          cont = conts[m];
          panels = bool.panels[page][cont];
          for(t=0;t<panels.length;t++){
            panel = panels[t];
            exp.panels.push(getModuleAddress('panel',{page:page,cont:cont,panel:panel}));
          }
        }
      }
    }
  }

  if(bool.sass){
    if(bool.sass.length){
      if(bool.sass.length > 0){
        let sasses = bool.sass;
        for(i=0;i<sasses.length;i++){
          let sass = sasses[i];
          exp.sass.push(getModuleAddress('sass',{page:page,cont:cont,panel:panel,name:sass}));
        }
      }
    }
  }

  return exp;

}

function getModuleAddress(type,parents){

  let readLocation = null,writeLocation = null;

  if(
    parents.hasOwnProperty('page') == false ||
    parents.hasOwnProperty('cont') == false ||
    parents.hasOwnProperty('panel') == false
  ){
    return common.error('invalid-comp_parents');
  }

  if(type == 'sass'){

    let baseLocation = process.cwd() + '\\';

    if(!parents.name){
      return common.error('not_found-comp_parent_name');
    }

    if(parents.name == null){
      return common.error('not_found-comp_parent_name');
    }

    readLocation = baseLocation + 'sass\\' + parents.name + '.scss';
    writeLocation = baseLocation + 'css\\' + parents.name + '.css';
  }
  if(type == 'page'){

    if(parents.page == null){
      return common.error('not_found-comp_parents_page');
    }

    readLocation = baseRead + parents['page'] + '\\page.js';
    writeLocation = baseWrite + parents['page'] + '\\page.js';
  }
  if(type == 'cont'){

    if(parents.page == null || parents.cont == null){
      return common.error('not_found-comp_parents_page/cont');
    }

    readLocation = baseRead + parents['page'] + '\\conts\\' + parents['cont'] + '\\cont.js';
    writeLocation = baseWrite + parents['page'] + '\\conts\\' + parents['cont'] + '\\cont.js';
  }
  if(type == 'panel'){

    if(parents.page == null || parents.cont == null || parents.panel == null){
      return common.error('not_found-comp_parents_page/cont/panel');
    }

    readLocation = baseRead + parents['page'] + '\\conts\\' + parents['cont'] + '\\panels\\' + parents['panel'] + '\\panel.js';
    writeLocation = baseWrite + parents['page'] + '\\conts\\' + parents['cont'] + '\\panels\\' + parents['panel'] + '\\panel.js';
  }

  if(
    readLocation == null ||
    writeLocation == null
  ){
    return common.error('invalid-comp_type');
  }

  return {read:readLocation,write:writeLocation};

}
