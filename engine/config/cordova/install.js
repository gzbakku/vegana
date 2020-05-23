module.exports = {

  init:async ()=>{

    let currentDirectory = io.dir.cwd() + "\\";
    let appDirectory = io.dir.app() + '\\cordova\\';

    //read package
    const package_path = currentDirectory + 'package.json';
    const package = await io.readJson(package_path);
    if(!package){
      return common.error('failed-read_package');
    }

    //create cordova project
    const create_project_script = 'cordova create cordova vegana.cordova.' + package.name + ' ' + package.name;
    const create_project = await cmd.run(create_project_script);
    if(!create_project){
      return common.error('failed-create_cordova_project');
    }

    //delete www project
    const www_path = currentDirectory + 'cordova\\www';
    const remove_www = await io.delete(www_path);
    if(!remove_www){
      return common.error('failed-remove_www_folder');
    }

    //make new www
    const create_www = await io.dir.ensure(www_path);
    if(!create_www){
      return common.error('failed-create_www_folder');
    }

    //copy the super html file
    const super_html_path = appDirectory + 'index.html';
    const new_html_path = currentDirectory + 'cordova\\www\\index.html';

    const copy = await io.copy(super_html_path,new_html_path);
    if(!copy){
      return common.error('failed - generate cordova compatible html file');
    }

    return true;

  }

};
