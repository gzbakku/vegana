module.exports = {

  init:async (compName,uiLib)=>{

    //--------------------------------------------------
    //get ui workers

    let uiLibpool = await uiRunner.getUiLibs()
    .then((libs)=>{return libs;}).catch(()=>{return false;});
    if(!uiLibpool){
      return common.error("failed-get-ui-libs");
    }
    const ui_dir = await uiRunner.getUiDir();
    if(!ui_dir){
      return common.error("failed-get-ui-dir");
    }

    //--------------------------------------------------
    //get comp name and compname if not procided

    if(!compName){
      compName = await input.text("please provide a ui component name");
    }
    if(compName.length === 0){
      return common.error("please provide a valid comp name.");
    }
    let libNotFound = true;
    if(uiLib && uiLibpool.indexOf(uiLib) < 0){
      common.error("failed-not_found-lib => " + uiLib);
      libNotFound = false;
    }
    if(uiLibpool.indexOf(uiLib) >= 0){
      libNotFound = false;
    }
    if(!uiLib || libNotFound){
      if(uiLibpool.length === 0){
        return common.error("please add a ui lib first");
      } else if(uiLibpool.length === 1){
        uiLib = uiLibpool[0];
      } else {
        uiLib = await input.select("please select a ui lib",uiLibpool);
      }
    }
    if(compName.indexOf('Comp') < 0){
      compName += "Comp";
    }

    //--------------------------------------------------
    //make comp files

    const lib_dir = ui_dir + "/" + uiLib;
    const comp_dir = lib_dir + "/" + compName;
    const bin_dir = io.dir.app();

    if(await io.exists(comp_dir)){
      return common.error("comp with this name already exists in the ui lib.");
    }

    if(!io.dir.ensure(comp_dir)){
      return common.error("failed-ensure-comp_dir");
    }

    const base_comp_path = bin_dir + '/generate/uiComp.js';
    const next_comp_path = comp_dir + "/comp.js";
    const base_scss_path = bin_dir + '/generate/index.scss';
    const next_scss_path = comp_dir + "/index.scss";

    if(!await io.copy(base_scss_path,next_scss_path)){
      return common.error("failed-generate-comp-scss-file");
    }
    if(!await io.copy(base_comp_path,next_comp_path)){
      return common.error("failed-generate-comp-js-file");
    }

    let readController = await io.read(next_comp_path);
    if(!readController){
      return common.error("failed-customize-controller_file");
    }

    readController = readController.replace("xxxx",compName);
    readController = readController.replace("nnnn",compName);

    const writeController = await io.write(next_comp_path,readController);
    if(!writeController){
      return common.error("failed-write-controller_file");
    }

    //--------------------------------------------------
    //insert in index

    const index_path = lib_dir + "/index.js";
    const ui_libs = await uiRunner.getUiComps(uiLib)
    .then((libs)=>{return libs;}).catch(()=>{return false;});
    if(!ui_libs){
      return common.error("failed-get-ui-libs");
    }
    let collect = '';
    for(let comp of ui_libs){
      if(comp !== "index.js"){
        collect += '\t"' + comp + '":' + 'require("./' + comp + '/comp.js"),\n';
      }
    }
    collect = "const comps = {\n" + collect + "};"
    collect += '\n\nengine.ui.add("' + uiLib + '",comps);';

    const writeUiController = await io.write(index_path,collect);
    if(!writeUiController){
      return common.error('failed-write-ui_controller');
    }

    common.success("ui comp generated successfully");

  }

};
