const wasm = require("./wasm");
const check = require('./check');
const copy = require('./copy');
const customize = require('./customize');
const lazy = require('./lazy');
const fsys = require('./fsys');
// const common = require("../../common");
const sass = require("./sass");
const comp = require("./comp");

module.exports = {
  init:init
};

async function init(type,name,laziness,outside,isGlobal){

  //check directory

  if(laziness && type == 'comp'){type = 'globalComp';}
  let compLocation,pgName,cnName,pnName,doCheck;
  let dontCheckDir = true;

  let base_dir = await fsys.get_base_dir();
  if(type === "wasm"){
    return wasm(name,await base_dir + "app/wasm");
  } else if(!base_dir){return common.error("failed-get_base_dir");}
  if(type === "page"){
    pgName = name;
    compLocation = base_dir + "app/pages/" + name + "Page/";
    if(!dontCheckDir && await io.exists(compLocation)){return common.error("page with given name already exists");}
  } else if(type === "cont"){
    pgName = get_variable("--page");
    if(pgName){
      let pageDir = base_dir + "app/pages/" + pgName + '/';
      if(!await io.exists(pageDir)){common.error(`given page ${pgName} is invalid`);pgName=null;}
    }
    if(!pgName){pgName = await fsys.get_page();if(!pgName){return common.error("failed-get-page_name");}}
    cnName = name;
    compLocation = base_dir + "app/pages/" + pgName + "/conts/" + name + "Cont/";
    if(!dontCheckDir && await io.exists(compLocation)){return common.error("cont with given name already exists");}
  } else if(type === "panel"){
    pgName = get_variable("--page");
    if(pgName){
      let pageDir = base_dir + "app/pages/" + pgName + '/';
      if(!await io.exists(pageDir)){common.error(`given page ${pgName} is invalid`);pgName = null;}
    }
    if(!pgName){pgName = await fsys.get_page();if(!pgName){return common.error("failed-get-page_name");}}
    cnName = get_variable("--cont");
    if(cnName){
      let contDir = base_dir + "app/pages/" + pgName + '/conts/' + cnName + '/';
      if(!await io.exists(contDir)){common.error(`given cont ${cnName} is invalid`);cnName=null;}
    }
    if(!cnName){cnName = await fsys.get_cont(pgName);if(!pgName){return common.error("failed-get-cont_name");}}
    pnName = name;
    compLocation = base_dir + "app/pages/" + pgName + "/conts/" + cnName + "/panels/" + name + "Panel/";
    if(!dontCheckDir && await io.exists(compLocation)){return common.error("panel with given name already exists");}
  } else if((type === "comp" || type === "globalComp") && isGlobal){
    compLocation = base_dir + "app/commonComps/" + name + "Comp/";
    if(!dontCheckDir && await io.exists(compLocation)){return common.error("common comp with given name already exists");}
  } else if((type === "comp" || type === "globalComp") && !laziness){
    compLocation = get_variable("--path");
    if(compLocation){
      if(!await io.exists(compLocation)){common.error(`given path doesnt exist => ${compLocation}`);compLocation=null;}
    }
    if(!compLocation){compLocation = await fsys.browse_dir();if(!compLocation){return common.error("failed-get-comp_path");}}
    compLocation += "/comps/" + name + "Comp/";
    compLocation = await io.clean_path(compLocation);
    if(!dontCheckDir && await io.exists(compLocation)){return common.error("comp with given name already exists");}
    if(!await io.dir.ensure(compLocation)){
      return common.error("failed-ensure_dir_for_comp");
    }
  } else if((type === "comp" || type === "globalComp") && laziness){
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
    compLocation += "sass/sassPack/" + name + "Pack/";
    laziness = true;
    // if(await io.exists(compLocation)){return common.error("global comp with given name already exists");}
  }

  //copy file
  let fileLocation;
  if(true){
    let doCopy = await copy.init(type,compLocation,name);
    if(doCopy == false){
      return common.error('deploy_file failed');
    }
    fileLocation = doCopy;
  }

  //gen sass file
  if(true && type !== "sass"){
    if(!await sass.init(type,compLocation,laziness,{
      page:pgName,
      cont:cnName,
      panel:pnName,
      name:name
    })){
      return common.error("failed-generate_sass_files");
    }
  }

  //customize
  if(true){
    let doCustomize = await customize.init(fileLocation,name,pgName,cnName,pnName,type);
    if(doCustomize == false){
      return common.error('customize_file failed');
    }
  }

  //integrate comp
  if(type === "comp" && isGlobal && true){
    if(!await common_collect.init()){
      return common.error("failed-integrate_comp_into_engine_pusher");
    }
  }

  //lazy load
  if(true){
    let doLazy = await lazy.init(laziness,type,name,pgName,cnName,pnName,base_dir);
    if(doLazy == false){
      return common.error('load_lazy_address failed');
    }
  }

  return true;

}
