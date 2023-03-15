// const check = require('./check');
// const compile = require('./compiler');
// const sass = require('./sass');
const edit = require('./edit');
const copy = require('./copy');
const make = require('./make');
const get_base = require('./get_base');
const serve_api = require("../../serve/index");

async function init(base,no_base){

  function help(){
    common.tell("--------------------------------------");
    let help_message = 'base directory is the location where you store the vegana project files for example if the index is available at https://vegana.js/website1/index.html please provide https://vegana.js/website1 as the base directory.';
    common.tell(help_message);
    common.tell("--------------------------------------");
    common.tell("you can set base_directory or vegana_web_base_url to your base directory in package.json to automate this input");
    common.tell("--------------------------------------");
    common.tell("flag : --help    | provides help options");
    common.tell("flag : --noBase  | builds without any base location");
    common.tell("flag : --tryBase | tries to extract base location from package.json if not found builds without base location");
    common.tell("--------------------------------------");
    return false;
  }
  if(base === "--help"){return help();}

  if(no_base || base === "--noBase"){base = false;no_base = true;}
  let try_base = false;
  if(base === "--tryBase"){try_base = true;}

  if((!base || try_base) && !no_base){
    base = await get_base.init();
    if(base){
      no_base = true;
      common.info("base directory for web build is taken from package.json");
      common.tell("------------------------");
      common.info(base);
      common.tell("------------------------");
    }
  }

  if(!base && !no_base && !try_base){
    if(await input.confirm("do you need help with base directory")){
      return help;
    }
    if(await input.confirm("do you want to provide a base build location right now")){
      base = await input.text("please give a base directory where the vegana app will be available");
      if(base.length > 0){
        if(!no_base && base.length > 0){
          if(await input.confirm("do you want to add this base directory to your package.json to automate this step")){
            if(!await get_base.new_base(base)){
              common.error("sorry we couldnt submit this base directory for some reson please try again next time.");
            }
          }
        }
      }
    } else {
      base = '';
    }
  }

  if(base){
    if(base[base.length - 1] === "/"){
      base = base.slice(0,-1);
    }
  } else {
    base = '';
  }

  //edit config
  if(!await edit.edit_config()){
    return common.error("failed edit config production property");
  }

  //set production flag
  global.VeganaBuildProduction = true;

  //compile all modules
  if(!await serve_api.compile.init(true)){
      return common.error("failed to compile static files");
  }

  //make folders
  if(true){
    let doMake = await make.init();
    if(!doMake){
      return common.error('failed-make_build_folders');
    }
  }

  //edit index
  if(true){
    let doEdit = await edit.init(base);
    if(!doEdit){
      return common.error('failed-process_index_file');
    }
  }

  //copy built files
  if(true){
    let doCopy = await copy.init();
    if(!doCopy){
      return common.error('failed-process_built_files');
    }
  }

  common.success("build finished");

  return true;

}

module.exports= {
  init:init
};
