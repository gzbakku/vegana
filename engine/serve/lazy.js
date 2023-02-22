const { log } = require("../../common");

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
  let bool = await io.readJson(file_path);
  if(!bool){return common.error('read_failed-lazy.json');}
  let exp = {
    pages:[],
    conts:[],
    panels:[],
    sass:[],
    globals:[],
    wasm:[],
    uiLibs:[]
  };

  // let i,t,p,m,s,c;                        //for_loop operators
  // let pages,page,conts,cont,panels,panel; //for_loop vars

  let wasm,global,page,cont,panel;

  if(bool.wasm && bool.wasm.length > 0){
    for(let wasm of bool.wasm){
      exp.wasm.push(await getModuleAddress('wasm',{wasm:wasm,global:null,page:null,cont:null,panel:null}));
    }
  }

  if(bool.globals && bool.globals.length > 0){
    for(let global of bool.globals){
      exp.globals.push(await getModuleAddress('global',{global:global,page:null,cont:null,panel:null}));
    }
  }

  if(bool.pages && bool.pages.length > 0){
    for(let page of bool.pages){
      exp.pages.push(await getModuleAddress('page',{global:global,page:page,cont:null,panel:null}));
    }
  }

  if(bool.conts && Object.keys(bool.conts).length > 0){
    for(let page in bool.conts){
      for(let cont of bool.conts[page]){
        exp.conts.push(await getModuleAddress('cont',{global:global,page:page,cont:cont,panel:null}));
      }
    }
  }

  if(bool.conts && Object.keys(bool.panels).length > 0){
    for(let page in bool.panels){
      for(let cont in bool.panels[page]){
        for(let panel of bool.panels[page][cont]){
          exp.panels.push(await getModuleAddress('panel',{global:global,page:page,cont:cont,panel:panel}));
        }
      }
    }
  }

  if(bool.sass){
    for(let sass of bool.sass){
      exp.sass.push(await getModuleAddress('sass',{global:global,page:page,cont:cont,panel:panel,name:sass}));
    }
  }

  for(let lib of await get_uiLibs()){
    exp.uiLibs.push(await getModuleAddress('uiLib',{lib:lib}));
  }

  return exp;

}

async function getModuleAddress(type,parents){

  let readLocation,writeLocation,app,sassRead,sassWrite;

  if(type === "uiLib"){
    readLocation = baseRead + '/ui/' + parents['lib'] + '/index.js';
    writeLocation = baseWrite + '/ui/' + parents['lib'] + '/ui.js';
    sassRead = baseRead + '/ui/' + parents['lib'] + '/@lazy.scss';
    sassWrite = baseWriteSass + '/ui/' + parents['lib'] + '/lazy.css';
  }

  if(type == 'sass'){
    if(!parents.name){return common.error('not_found-comp_parent_name');}
    let baseLocation = await io.dir.cwd();baseLocation += "/";
    readLocation = baseLocation + 'sass/sassPack/' + parents.name + '/pack.scss';
    writeLocation = baseLocation + 'css/sassPack/' + parents.name + '/pack.css';
    sassRead = readLocation;
    sassWrite = writeLocation;
  }

  if(type == 'wasm'){
    if(!parents.wasm){return common.error('not_found-global_comp_name');}
    readLocation = baseRead + '/wasm/' + parents['wasm'];
    writeLocation = baseWrite + '/wasm/' + parents['wasm'];
    app = parents['wasm'];
  }

  if(type == 'global'){
    if(!parents.global){return common.error('not_found-global_comp_name');}
    readLocation = baseRead + '/globals/' + parents['global'] + '/globalComp.js';
    writeLocation = baseWrite + '/globals/' + parents['global'] + '/globalComp.js';
    sassRead = baseRead + '/globals/' + parents['global'] + '/+comp.scss';
    sassWrite = baseWriteSass + '/globals/' + parents['global'] + '/comp.css';
  }

  if(type == 'page'){
    if(!parents.page){return common.error('not_found-comp_parents_page');}
    readLocation = baseRead + '/pages/' + parents['page'] + '/page.js';
    writeLocation = baseWrite + '/pages/' + parents['page'] + '/page.js';
    sassRead = baseRead + '/pages/' + parents['page'] + '/+page.scss';
    sassWrite = baseWriteSass + '/pages/' + parents['page'] + '/page.css';
  }

  if(type == 'cont'){
    if(!parents.page || !parents.cont){return common.error('not_found-comp_parents_page/cont');}
    readLocation = baseRead + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
    writeLocation = baseWrite + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/cont.js';
    sassRead = baseRead + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/+cont.scss';
    sassWrite = baseWriteSass + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/cont.css';
  }

  if(type == 'panel'){
    if(!parents.page || !parents.cont || !parents.panel){return common.error('not_found-comp_parents_page/cont/panel');}
    readLocation = baseRead + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
    writeLocation = baseWrite + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.js';
    sassRead = baseRead + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/+panel.scss';
    sassWrite = baseWriteSass + '/pages/' + parents['page'] + '/conts/' + parents['cont'] + '/panels/' + parents['panel'] + '/panel.css';
  }

  if(!readLocation || !writeLocation){return common.error('invalid-comp_type');} else {
    return {app:app,read:readLocation,write:writeLocation,sassRead:sassRead,sassWrite:sassWrite};
  }

}

async function get_uiLibs(){
  const ui_dir = `${await io.get_base_dir()}/app/ui`;
  let collect = [];
  for(let item of await io.get_sub_dir(ui_dir)){
    if(item.includes("Ui")){collect.push(item);}
  }
  return collect;
}
