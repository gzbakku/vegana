

module.exports = {
  init:init
};

async function init(){

  if(!await check_vegana_directory.init()){
    return common.error("not vegana directory");
  }

  let uiLibs = await uiRunner.getUiLibs()
  .then((libs)=>{return libs;})
  .catch(()=>{return false;});
  if(!uiLibs){
    return common.error("failed-get-ui-libs");
  }

  const uiDir = await uiRunner.getUiDir();
  if(!uiDir){
    return common.error("failed-get-ui-dir");
  }

  for(let lib of uiLibs){
    let base_lib_index_path = uiDir + `/${lib}/index.scss`;
    let new_lib_index_path = uiDir + `/${lib}/@index.scss`;
    if(await io.exists(base_lib_index_path)){
      if(!await io.rename(base_lib_index_path,new_lib_index_path)){
        return common.error(`failed-upgrade_lib => ${lib}`);
      }
    }
  }

  let ui_manager_path = uiDir + `/ui.json`;
  let ui_controller = [];
  if(await io.exists(ui_manager_path)){
    let ui_controller = await readJson(ui_manager_path);
    if(!ui_controller){
      return common.error("failed-read-ui_controller");
    }
  } else {
    ui_controller = uiLibs;
  }

  let ui_index_scss_path = uiDir + `/index.scss`;
  let ui_index_js_path = uiDir + `/index.js`;
  let ui_index_manage_path = uiDir + `/manage.json`;
  let compile_index_scss = '';
  let compile_index_js = '';
  for(let lib of ui_controller){
    let lib_index_sass_file = `${uiDir}/${lib}/@index.scss`;
    let lib_index_js_file = `${uiDir}/${lib}/index.js`;
    if(await io.exists(lib_index_sass_file)){
      compile_index_scss += `\n@import './${lib}/@index.scss';`;
    }
    if(await io.exists(lib_index_js_file)){
      compile_index_js += `\nrequire("./${lib}/index.js");`;
    }
  }
  if(!await io.write(ui_index_scss_path,compile_index_scss)){
    return common.error(`failed-write-ui_index_scss => ${ui_index_scss}`);
  }
  if(!await io.write(ui_index_js_path,compile_index_js)){
    return common.error(`failed-write-ui_index_js_path => ${ui_index_js_path}`);
  }
  if(!await io.write(ui_index_manage_path,JSON.stringify(ui_controller))){
    return common.error(`failed-write-ui_index_manage_path => ${ui_index_manage_path}`);
  }

  return common.success("core ui successfully upgraded");

}
