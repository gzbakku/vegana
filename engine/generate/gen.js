const common = require('../../common');
const wasm = require("./wasm");
const fs = require('fs-extra');

//local modulkes
const check = require('./check');
const copy = require('./copy');
const customize = require('./customize');
const lazy = require('./lazy');
const fsys = require('./fsys');

module.exports = {
  init:init
};

async function init(type,name,laziness,outside){

  //check directory

  if(type === "wasm"){
    return wasm(name,fsys.get_base_dir() + "/app/wasm");
  }

  if(laziness && type == 'comp'){type = 'globalComp';}

  let compLocation,pgName,cnName,pnName,doCheck,base_dir;

  if(!outside){
    doCheck = await check.init(type,name);
    if(doCheck == false){
      return common.error('check_directory failed');
    }
    compLocation = doCheck['location'],
    pgName = doCheck['page'],
    cnName = doCheck['cont'],
    pnName = doCheck['panel'];
  } else {
    base_dir = await fsys.get_base_dir();
    if(!base_dir){return common.error("failed-get_base_dir");}
    if(type === "page"){
      pgName = name;
      compLocation = base_dir + "app/pages/" + name + "Page/";
      if(await io.exists(compLocation)){return common.error("page with given name already exists");}
    } else if(type === "cont"){
      pgName = await fsys.get_page();if(!pgName){return common.error("failed-get-page_name");}
      cnName = name;
      compLocation = base_dir + "app/pages/" + pgName + "/conts/" + name + "Cont/";
      if(await io.exists(compLocation)){return common.error("cont with given name already exists");}
    } else if(type === "panel"){
      pgName = await fsys.get_page();if(!pgName){return common.error("failed-get-page_name");}
      cnName = await fsys.get_cont(pgName);if(!pgName){return common.error("failed-get-cont_name");}
      pnName = name;
      compLocation = base_dir + "app/pages/" + pgName + "/conts/" + cnName + "/panels/" + name + "Panel/";
      if(await io.exists(compLocation)){return common.error("panel with given name already exists");}
    } else if(type === "comp"){
      compLocation = await fsys.browse_dir();
      if(!compLocation){
        return common.error("failed-get_dir_for_comp");
      }
      compLocation = compLocation += "/comps/" + name + "Comp/";
      if(await io.exists(compLocation)){return common.error("comp with given name already exists");}
      if(!await io.dir.ensure(compLocation)){
        return common.error("failed-ensure_dir_for_comp");
      }
    } else if(type === "globalComp"){
      compLocation = await fsys.get_base_dir();
      if(!compLocation){
        return common.error("failed-get_base_dir");
      }
      compLocation += "app/globals/" + name + "Comp/";
      if(await io.exists(compLocation)){return common.error("global comp with given name already exists");}
    } else if(type === "sass"){
      compLocation = await fsys.get_base_dir();
      if(!compLocation){
        return common.error("failed-get_base_dir");
      }
      compLocation += "sass/";
      // if(await io.exists(compLocation)){return common.error("global comp with given name already exists");}
    }
  }

  //copy file
  let doCopy = await copy.init(type,compLocation,name);
  if(doCopy == false){
    return common.error('deploy_file failed');
  }

  let fileLocation = doCopy;

  //customize
  let doCustomize = await customize.init(fileLocation,name,pgName,cnName,pnName,type);
  if(doCustomize == false){
    return common.error('customize_file failed');
  }

  //lazy load
  let doLazy = await lazy.init(laziness,type,name,pgName,cnName,pnName,base_dir);
  if(doLazy == false){
    return common.error('load_lazy_address failed');
  }

  return true;

}
