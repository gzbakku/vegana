// const fs = require('fs-extra');

//test
//const currentDirectory = process.cwd() + '//akku//';
//const baseRead = './akku/app/pages/';
//const baseWrite = './akku/js/pages/';

//prod
// const currentDirectory = process.cwd() + '/';
// const baseRead = currentDirectory + 'app';
// const baseWrite = currentDirectory + 'js';
// const baseWriteSass = currentDirectory + 'css';

let currentDirectory,baseRead,baseWrite,baseWriteSass;

module.exports = {
  getAllModules:getAllModules,
  getModuleAddress:getModuleAddress
};

async function getAllModules(){

  if(!currentDirectory){currentDirectory = await io.dir.cwd();}
  if(!baseRead){baseRead = currentDirectory + "/app"}
  if(!baseWrite){baseWrite = currentDirectory + "/js"}
  if(!baseWriteSass){baseWriteSass = currentDirectory + "/css"}

  common.tell('fetching lazy modules');

  let file_path = currentDirectory + '/lazy.json';

  let read = await io.readJson(file_path);
  if(read === false){
    return common.error('read_failed-lazy.json');
  }

  let bool = read;

  let exp = {
    pages:[],
    conts:[],
    panels:[],
    sass:[],
    globals:[],
    wasm:[]
  };

  let i,t,p,m,s,c;                        //for_loop operators
  let pages,page,conts,cont,panels,panel; //for_loop vars

  if(bool.wasm){
    if(bool.wasm.length){
      if(bool.wasm.length > 0){
        for(let wasm of bool.wasm){
          exp.wasm.push(await getModuleAddress('wasm',{wasm:wasm,global:null,page:null,cont:null,panel:null}));
        }
      }
    }
  }

  if(bool.globals){
    if(bool.globals.length){
      if(bool.globals.length > 0){
        globals = bool.globals;
        for(i=0;i<globals.length;i++){
          global = globals[i];
          exp.globals.push(await getModuleAddress('global',{global:global,page:null,cont:null,panel:null}));
        }
      }
    }
  }

  if(bool.pages){
    if(bool.pages.length){
      if(bool.pages.length > 0){
        pages = bool.pages;
        for(i=0;i<pages.length;i++){
          page = pages[i];
          exp.pages.push(await getModuleAddress('page',{global:global,page:page,cont:null,panel:null}));
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
          exp.conts.push(await getModuleAddress('cont',{global:global,page:page,cont:cont,panel:null}));
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
            exp.panels.push(await getModuleAddress('panel',{global:global,page:page,cont:cont,panel:panel}));
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
          exp.sass.push(await getModuleAddress('sass',{global:global,page:page,cont:cont,panel:panel,name:sass}));
        }
      }
    }
  }

  return exp;

}

async function getModuleAddress(type,parents){

  let readLocation = null,writeLocation = null,app = null,sassRead=null,sassWrite=null;

  if(
    parents.hasOwnProperty('page') == false ||
    parents.hasOwnProperty('cont') == false ||
    parents.hasOwnProperty('panel') == false ||
    parents.hasOwnProperty('global') == false
  ){
    return common.error('invalid-comp_parents');
  }

  if(type == 'sass'){

    let baseLocation = process.cwd() + '/';

    if(!parents.name){
      return common.error('not_found-comp_parent_name');
    }

    if(parents.name == null){
      return common.error('not_found-comp_parent_name');
    }

    readLocation = baseLocation + 'sass/' + parents.name + '.scss';
    writeLocation = baseLocation + 'css/' + parents.name + '.css';

    sassRead = readLocation;
    sassWrite = writeLocation;
  }

  if(type == 'wasm'){

    if(parents.wasm == null){
      return common.error('not_found-global_comp_name');
    }

    readLocation = baseRead + '/wasm/' + parents['wasm'];
    writeLocation = baseWrite + '/wasm/' + parents['wasm'];
    app = parents['wasm'];
  }

  if(type == 'global'){

    if(parents.global == null){
      return common.error('not_found-global_comp_name');
    }

    readLocation = baseRead + '/globals/' + parents['global'] + '/globalComp.js';
    writeLocation = baseWrite + '/globals/' + parents['global'] + '/globalComp.js';

    sassRead = baseRead + '/globals/' + parents['global'] + '/+comp.scss';
    sassWrite = baseWriteSass + '/globals/' + parents['global'] + '/comp.css';
  }

  if(type == 'page'){

    if(parents.page == null){
      return common.error('not_found-comp_parents_page');
    }

    readLocation = baseRead + '/pages/' + parents['page'] + '/page.js';
    writeLocation = baseWrite + '/pages/' + parents['page'] + '/page.js';

    sassRead = baseRead + '/pages/' + parents['page'] + '/+page.scss';
    sassWrite = baseWriteSass + '/pages/' + parents['page'] + '/page.css';
  }

  if(type == 'cont'){

    if(parents.page == null || parents.cont == null){
      return common.error('not_found-comp_parents_page/cont');
    }

    readLocation = baseRead + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
    writeLocation = baseWrite + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';

    sassRead = baseRead + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/+cont.scss';
    sassWrite = baseWriteSass + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/cont.css';
  }

  if(type == 'panel'){

    if(parents.page == null || parents.cont == null || parents.panel == null){
      return common.error('not_found-comp_parents_page/cont/panel');
    }

    readLocation = baseRead + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
    writeLocation = baseWrite + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
  
    sassRead = baseRead + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/+panel.scss';
    sassWrite = baseWriteSass + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.css';
  }

  if(!readLocation && !writeLocation){return common.error('invalid-comp_type');}
  return {app:app,read:readLocation,write:writeLocation,sassRead:sassRead,sassWrite:sassWrite};

}
