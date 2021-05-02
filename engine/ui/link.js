

module.exports = {
  init:init
};

async function init(uiLibName){

  if(!uiLibName){uiLibName = get_variable("--lib");}
  if(!uiLibName){uiLibName = get_variable("--ui");}
  if(!uiLibName){uiLibName = get_variable("--ui-lib");}

  let uiLibs = await uiRunner.getUiLibs()
  .then((libs)=>{return libs;})
  .catch(()=>{return false;});
  if(!uiLibs){
    return common.error("failed-get-ui-libs");
  }

  if(!uiLibName || uiLibs.indexOf(uiLibName) < 0){
    if(uiLibs.length === 0){
      return common.error("please add some ui libs first");
    } else if(uiLibs.length === 1){
      if(!await input.confirm(`do you want to link ${uiLibs[0]}`)){
        return common.error("ui lib linking cancelled");
      }
      uiLibName = uiLibs[0];
    } else {
      uiLibName = await input.select(`please select the ui lib to link`,uiLibs);
    }
  }

  let path = await io.browse_dir();
  let index = 0;
  let path_items = io.clean_path(path).split("/");
  for(let item of path_items){
    if(item === "app"){break;} else {index += 1;}
  }

  if(index+1 === path_items.length && path_items[path_items.length-1] === "app"){
    return common.error("you dont need to use ui linker for linking ui lib to anything in root app directory.");
  }

  let path_to_app_dir = '';
  for(let i=index+1;i<path_items.length;i++){
    path_to_app_dir += '../';
  }

  let path_to_ui_lib = path_to_app_dir + `ui/${uiLibName}`;
  let path_to_ui_lib_js = path_to_ui_lib + '/index.js';
  let path_to_ui_lib_scss = path_to_ui_lib + '/@index.scss';

  common.tell(`js file path : ${path_to_ui_lib_js}`);
  common.tell(`scss file path : ${path_to_ui_lib_scss}`);

  let files = await io.get_dir_items(path);
  let collect_js = [];
  let collect_scss = [];
  for(let file of files){
    if(file.indexOf(".js") >= 0){collect_js.push(file);}
    if(file.indexOf(".scss") >= 0){collect_scss.push(file);}
  }

  if(true && !await input.confirm(`do you want to link ui lib with vegana module.`)){
    return common.success("you have to link the ui lib with the path provided above.");
  }

  let selected_js;
  if(true){
    if(collect_js.length === 0){
      common.error("no js file found for this directory");
    } else if(collect_js.length === 1){
      if(await input.confirm(`do you want to link ${collect_js[0]} with ui lib.`)){
        selected_js = collect_js[0];
      }
    } else {
      selected_js = await input.select("please select a js file to link with ui lib",collect_js);
    }
  }
  if(true && selected_js){
    let js_file_path = io.clean_path(path) + `/${selected_js}`;
    if(await io.exists(js_file_path)){
      let read_js = await io.read(js_file_path);
      if(read_js === false){return common.error(`failed-read_js => ${js_file_path}`);}
      read_js = `require("${path_to_ui_lib_js}");\n` + read_js;
      if(!await io.write(js_file_path,read_js)){return common.error(`failed-update_js => ${js_file_path}`);}
    }
  }

  let selected_scss;
  if(true){
    if(collect_scss.length === 0){
      return common.error("no sass file found for this directory");
    } else if(collect_scss.length === 1){
      if(await input.confirm(`do you want to link ${collect_scss[0]} with ui lib.`)){
        selected_scss = collect_scss[0];
      }
    } else {
      selected_scss = await input.select("please select a scss file to link with ui lib",collect_scss);
    }
  }
  if(true && selected_scss){
    let scss_file_path = io.clean_path(path) + `/${selected_scss}`;
    if(await io.exists(scss_file_path)){
      let read_scss = await io.read(scss_file_path);
      if(read_scss === false){return common.error(`failed-read_scss => ${scss_file_path}`);}
      read_scss += `\n@import '${path_to_ui_lib_scss}';`;
      if(!await io.write(scss_file_path,read_scss)){return common.error(`failed-update_scss => ${scss_file_path}`);}
    }
  }

  common.success("ui lib linked successfully.");

}
