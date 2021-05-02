module.exports = {

  init:async (name)=>{

    if(!name){
      name = await input.text("please provide a name for ui lib");
    }
    if(!name || name.length === 0){
      return common.error("failed-invalid-ui_lib-name");
    }

    name = name.replace("Ui","");

    const this_name = name + "Ui";
    const ui_pool = await uiRunner.getUiLibs().then((f)=>{return f;}).catch((e)=>{console.log(e);return false;});
    const ui_dir = await uiRunner.getUiDir().then((f)=>{return f;}).catch(()=>{return false;});
    if(ui_pool === false){
      return common.error("failed-get-UiLibs");
    }
    if(ui_dir === false){
      return common.error("failed-get-UiDir");
    }

    const check_dir = true;
    const this_ui_dir = ui_dir + "/" + this_name;
    if(check_dir && await io.exists(this_ui_dir)){
      return common.error("ui lib with this name already exists.");
    }
    if(!await io.dir.ensure(this_ui_dir)){
      return common.error("failed-generate-ui-directory");
    }

    common.tell("lib dir ensured");

    //copy the ui index file
    const bin = await io.dir.app();

    const uiSassBinPath = bin + "/generate/clean.scss";
    const uiSassToPath = this_ui_dir + "/@index.scss";

    if(!await io.copy(uiSassBinPath,uiSassToPath)){
      return common.error("failed-generate-comp-sass_file");
    }

    const uiIndexPath = bin + "/generate/uiIndex.js"
    const nextIndexPath = this_ui_dir + "/index.js";

    //copy the index file
    const copy = await io.copy(uiIndexPath,nextIndexPath);
    if(!copy){
      return common.error("failed-generate-lib-index-file");
    }

    common.tell("index file created");

    //read the file
    let read = await io.read(nextIndexPath);
    if(!read){
      return common.error("failed-read-config-lib-index-file");
    }

    read = read.replace("!!---!!",this_name);

    const write = await io.write(nextIndexPath,read);
    if(!write){
      return common.error("failed-write-config-lib-index-file");
    }

    //------------------------------------
    //make ui index file

    let uiDir = ui_dir,active = [],ui_index_manage_path = uiDir + `/manage.json`;
    if(await io.exists(ui_index_manage_path)){
      active = await io.readJson(ui_index_manage_path);
      if(!active){
        return common.error(`failed read ${ui_index_manage_path} make sure this file has valid json or delete it if you cant.`);
      }
    }
    active.push(this_name);

    let
    ui_index_scss_path = uiDir + `/index.scss`,ui_index_js_path = uiDir + `/index.js`,
    compile_index_scss = '',compile_index_js = '';
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

    common.tell("lib integrated successfully");

    //---------------------------------------
    //return success

    common.success("lib successfully generated");

  }

};
