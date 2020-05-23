const fs = require('fs-extra');

module.exports = async (name,container)=>{

  common.tell("creating a new cargo project");

  let script = "wasm-pack new " + name;

  if(false){
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

  if(false){
    const make_lazy_entry = await lazify(name);
    if(!make_lazy_entry){
      return common.error("failed-insert_wasm_lazy_entry");
    }
  }

  if(false){
    const do_remove_git = await remove_git(name);
    if(!do_remove_git){
      return common.error("failed-do_remove_git");
    }
  }

  if(true){
    const do_copy_wrapper = await copy_wrapper(name);
    if(!do_copy_wrapper){
      return common.error("failed-do_copy_wrapper");
    }
    const do_edit_wrapper = await edit_wrapper(do_copy_wrapper,name);
    if(!do_edit_wrapper){
      return common.error("failed-do_edit_wrapper");
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

async function copy_wrapper(name){
  const from = io.dir.app() + '\\wasm\\wrapper.js'
  const to = io.dir.cwd() + '\\' + name + "\\wrapper.js"
  let do_copy = await io.copy(from,to);
  if(!do_copy){
    return common.error("failed-copy_wrapper");
  } else {
    return to;
  }
}

async function edit_wrapper(location,name){
  let read = await io.read(location);
  if(!read){
    return common.error("failed-read_wrapper");
  }
  read = read.replace("zzzz",name);
  let write = await io.write(location,read);
  if(!write){
    return common.error("failed-write_wrapper");
  }
  return true;
}
