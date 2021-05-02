

module.exports = {
  init:init
};

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
    if(uiLibpool.length === 0){return common.error("no ui libs found");}
    if(uiLibpool.length === 1){common.tell(`selected the only available ui lib : ${uiLibpool[0]}`);} else {
      uiLibName = await input.select("please select a ui lib",uiLibpool);
    }
  }

  const ui_dir = await uiRunner.getUiDir();
  if(!ui_dir){
    return common.error("failed-get-ui-dir");
  }

  const ui_comps = await uiRunner.getUiComps(uiLibName)
  .then((libs)=>{return libs;}).catch(()=>{return false;});
  if(!ui_comps){
    return common.error("failed-get-ui-libs");
  }

  const lib_dir = ui_dir + "/" + uiLibName;

  for(let comp of ui_comps){
    let from_1 = lib_dir + `/${comp}/index.scss`;
    let from_2 = lib_dir + `/${comp}/comp.scss`;
    let from;
    if(await io.exists(from_1)){from = from_1;}
    if(await io.exists(from_2)){from = from_2;}
    if(from){
      let to = lib_dir + `/${comp}/@comp.scss`;
      if(!await io.rename(from,to)){
        return common.error("failed-change_index_scss_name");
      } else {
        common.tell(`${comp} upgraded`);
      }
    }
  }

  //------------------------
  //make js index
  const index_js_file_path = lib_dir + "/@index.js";
  let make = '\nconst comps = {';
  for(let comp of ui_comps){
    make += `\n\t"${comp}":require("./${comp}/comp.js"),`;
  }
  make += "\n};\n";
  make += `\nengine.ui.add("${uiLibName}",comps);\n`;
  if(!await io.write(index_js_file_path,make)){
    return common.error("failed-write-sass_index");
  }

  common.tell("js index file upgraded");

  //------------------------
  //make sass index
  const index_sass_file_path = lib_dir + "/index.scss";
  let make_sass = '';
  for(let comp of ui_comps){
    make_sass += `\n@import './${comp}/@comp.scss';`;
  }
  if(!await io.write(index_sass_file_path,make_sass)){
    return common.error("failed-write-sass_index");
  }

  common.tell("sass index file upgraded");

  //------------------------
  //make manage file
  const manage_file_path = lib_dir + "/manage.json";
  if(!await io.write(manage_file_path,JSON.stringify([]))){
    return common.error("failed-write-lib-manage_file");
  }

  common.tell("manage ui lib file upgraded");

  return common.success("ui upgrade successfull");

}
