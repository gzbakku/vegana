

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

  let active = [];
  let ui_index_manage_path = uiDir + `/manage.json`;
  if(await io.exists(ui_index_manage_path)){
    active = await io.readJson(ui_index_manage_path);
    if(!active){
      return common.error(`failed read ${ui_index_manage_path} make sure this file has valid json or delete it if you cant.`);
    }
  }
  if(uiLibs.length === 0){
    return common.error("please add some ui libs before.");
  }
  else if(uiLibs.length === 1){
    if(await input.confirm(`do you want to integrate ${uiLibs[0]} in core ui.`)){
      active = uiLibs;
    }
  } else {
    let collect = [];
    for(let lib of uiLibs){
      if(active.indexOf(lib) >= 0){
        collect.push({name:lib,value:lib,checked:true});
      } else {
        collect.push({name:lib,value:lib,checked:false});
      }
    }
    active = await input.checkboxes(`select ui libs to integrate in core ui.`,collect);
  }

  let ui_index_scss_path = uiDir + `/index.scss`;
  let ui_index_js_path = uiDir + `/index.js`;

  let compile_index_scss = '';
  let compile_index_js = '';
  for(let lib of active){
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
  if(!await io.write(ui_index_manage_path,JSON.stringify(active))){
    return common.error(`failed-write-ui_index_manage_path => ${ui_index_manage_path}`);
  }

  return common.success("ui libs integrated successfully.");

}
