

module.exports = {init:init};

async function init(uiLibName){

  if(!uiLibName){uiLibName = get_variable("--lib");}
  if(!uiLibName){uiLibName = get_variable("--ui");}
  if(!uiLibName){uiLibName = get_variable("--ui-lib");}

  if(!uiLibName){
    let uiLibpool = await uiRunner.getUiLibs()
    .then((libs)=>{return libs;}).catch(()=>{return false;});
    if(!uiLibpool){
      return common.error("failed-get-ui-libs");
    }
    uiLibName = await input.select("please select a ui lib",uiLibpool);
  }

  const ui_dir = await uiRunner.getUiDir();
  if(!ui_dir){
    return common.error("failed-get-ui-dir");
  }

  const lib_dir = ui_dir + "/" + uiLibName;
  const manage_file_path = lib_dir + "/manage.json";
  const index_sass_file_path = lib_dir + "/@index.scss";
  const index_js_file_path = lib_dir + "/index.js";

  let manage_file;
  if(!await io.exists(manage_file_path)){manage_file = [];} else {
    manage_file = await io.readJson(manage_file_path);
    if(manage_file === false){return common.error("failed-read-ui_lib-manage_file");}
  }

  const ui_comps = await uiRunner.getUiComps(uiLibName)
  .then((libs)=>{return libs;}).catch(()=>{return false;});
  if(!ui_comps){
    return common.error("failed-get-ui-libs");
  }

  let collect = [];
  for(let comp of ui_comps){
    collect.push({
      name:comp,
      checked:manage_file.indexOf(comp) >= 0?true:false
    });
  }

  let select_comps = await input.checkboxes("please select the comps to activate",collect);

  //------------------------
  //make js index

  let make = '\nconst comps = {';
  for(let comp of select_comps){
    make += `\n\t"${comp}":require("./${comp}/comp.js"),`;
  }
  make += "\n};\n";
  make += `\nengine.ui.add("${uiLibName}",comps);\n`;
  if(!await io.write(index_js_file_path,make)){
    return common.error("failed-write-sass_index");
  }

  //------------------------
  //make sass index

  let make_sass = '';
  for(let comp of select_comps){
    make_sass += `\n@import './${comp}/@comp.scss';`;
  }
  if(!await io.write(index_sass_file_path,make_sass)){
    return common.error("failed-write-sass_index");
  }

  //------------------------
  //make manage index

  if(!await io.write(manage_file_path,JSON.stringify(select_comps))){
    return common.error("failed-write-lib-manage_file");
  }

  return common.success("lib edited successfully.");

}
