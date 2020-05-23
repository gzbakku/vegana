const fs = require('fs-extra');

module.exports = async (name,container)=>{

  common.tell("creating a new cargo project");

  let script = "wasm-pack new " + name;

  if(true){
    const make = await cmd.run(script)
    .then(()=>{
      return true;
    }).catch((e)=>{
      if(Object.keys(e).indexOf("killed") < 0){
        return true;
      }
      common.error(e);
      return common.error("failed-create_new_wasm_project-wasm_pack");
    });
    if(!make){
      return false;
    }
  }

  common.tell("wasm project created");

  if(true){
    const make_lazy_entry = await lazify(name);
    if(!make_lazy_entry){
      return common.error("failed-insert_wasm_lazy_entry");
    }
  }

  if(true){
    const do_remove_git = await remove_git(name);
    if(!do_remove_git){
      return common.error("failed-do_remove_git");
    }
  }

  return true;

}

async function remove_git(name){

  let cwd = process.cwd();
  let path = cwd + "\\" + name + "\\";
  let git_dir_path = path + ".git";
  let git_file_path =  path + ".gitignore";

  const remove_dir = await fs.remove(git_dir_path)
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    common.error(err);
    return common.error("failed-remove_dir-remove_git");
  });

  if(!remove_dir){
    return false;
  }

  const remove_file = await fs.remove(git_file_path)
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    common.error(err);
    return common.error("failed-remove_file-remove_git");
  });

  if(!remove_file){
    return false;
  }

  return true;

}

async function lazify(name){

  let currentDirectory = process.cwd() + '\\';
  let lazyPath = '';

  if(!currentDirectory.match('app')){
    return common.error('invalid-project_directory');
  }

  let locationArray = currentDirectory.split('\\');

  let appIndex = locationArray.indexOf('app');

  for(var i=0;i<appIndex;i++){
    let pathComp = locationArray[i];
    lazyPath = lazyPath + pathComp + '\\';
  }

  lazyPath = lazyPath + 'lazy.json';

  let read = await fs.readFile(lazyPath,'utf-8')
  .then((data)=>{
    return data;
  })
  .catch((err)=>{
      console.log(err);
      return false;
  });

  let bool = JSON.parse(read);
  if(!bool.wasm){
    bool.wasm = [name];
  } else {
    bool.wasm.push(name);
  }

  let write = await fs.writeFile(lazyPath,JSON.stringify(bool,null,2),'utf-8')
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    console.log(err);
    return false;
  });

  if(write == false){
    return common.error('write updated lazy.json failed');
  }

  return true;

}