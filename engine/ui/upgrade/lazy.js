const { moveSync } = require("fs-extra");
const { log } = require("../../../common");
const common = require("../../../common");
const io = require("../../../io");


module.exports = {
  init:init
};

async function init(){

  if(!await check_vegana_directory.init()){
    return common.error("not vegana directory");
  }

  const base_dir = await io.get_base_dir();
  const ui_dir = `${base_dir}/app/ui`;
  if(!await io.exists(ui_dir)){
    return common.error("no ui dir found in app");
  }

  const sub_dirs = await io.get_sub_dir(ui_dir);
  for(let item of sub_dirs){
    if(typeof(item) === 'string'){
      if(item.includes("Ui")){
        if(!await upgrade_lib(ui_dir,item)){
          common.error(`failed to make lazy file for ${item}`);
          return;
        }
      }
    }
  }

  common.success("lazy scss files built for all ui libs");

}

async function upgrade_lib(ui_dir,lib){

  const path = `${ui_dir}/${lib}`;
  const lazy_scss_path = `${path}/@lazy.scss`;
  if(await io.exists(lazy_scss_path)){
    return common.tell(`lazy scss file for ${lib} already exists`);
  }

  // console.log(lazy_scss_path);

  let build = `@import '../../../sass/sass_variables.scss';\n`;
  build += `@import './@index.scss';`;

  if(!await io.write(lazy_scss_path,build)){
    return common.error(`failed build lazy scss file => ${path}`);
  } else {
    common.tell(`lazy file built for ${lib}`);
    return true;
  }

}
