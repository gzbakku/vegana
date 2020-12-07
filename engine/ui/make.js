module.exports = {

  init:async (name)=>{

    if(!name){
      name = await input.text("please provide a name for ui lib");
    }
    if(!name || name.length === 0){
      return common.error("failed-invalid-ui_lib-name");
    }

    const this_name = name + "Ui";
    const ui_pool = await uiRunner.getUiLibs().then((f)=>{return f;}).catch((e)=>{console.log(e);return false;});
    const ui_dir = await uiRunner.getUiDir().then((f)=>{return f;}).catch(()=>{return false;});
    if(ui_pool === false){
      return common.error("failed-get-UiLibs");
    }
    if(ui_dir === false){
      return common.error("failed-get-UiDir");
    }

    common.tell("app dir found");

    if(ui_pool.indexOf(this_name) >= 0 && true){
      return common.error("ui lib already exists with this name try generate command to add new components to this ui");
    }

    //activate dir check here
    const this_ui_dir = ui_dir + "/" + this_name;
    if(await io.exists(this_ui_dir)){
      return common.error("ui lib with this name already exists.");
    }
    if(!await io.dir.ensure(this_ui_dir)){
      return common.error("failed-generate-ui-directory");
    }

    common.tell("lib dir ensured");

    //copy the ui index file
    const bin = await io.dir.app();
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

    const ui_index_path = ui_dir + "/index.js";
    const ui_libs = await uiRunner.getUiLibs().then((f)=>{return f;}).catch(()=>{return false;});
    if(ui_libs === false){
      return common.error("failed-get_ui_libs");
    }
    let make = '';
    for(let lib of ui_libs){
      if(lib !== "index.js"){
        make += 'require("./' + lib + '/index.js");\n';
      }
    }
    if(!await io.write(ui_index_path,make)){
      return common.error("failed-add_lib_to_lib_index");
    }

    common.tell("index file configured");

    common.tell("lib successfully generated");

  }

};
