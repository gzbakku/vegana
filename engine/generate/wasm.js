module.exports = async (name,container)=>{

  if(!await io.exists(container)){
    await io.dir.ensure(container);
  }

  if(await io.exists(container + "/" + name)){
    return common.error("folder with same name already exists in wasm folder please choose a diffrent name or delete that folder.");
  }

  process.chdir(container);

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
    const do_remove_git = await remove_git(name,container);
    if(!do_remove_git){
      return common.error("failed-do_remove_git");
    }
  }

  if(true){
    const do_copy_wrapper = await copy_wrapper(name,container);
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

async function remove_git(name,container){
  let path = container + "/" + name + "/";
  let git_dir_path = path + ".git";
  let git_file_path =  path + ".gitignore";
  if(await io.exists(git_dir_path)){
    if(!await io.delete(git_dir_path)){
      return common.error("failed-remove_dir-remove_git");
    }
  }
  if(await io.exists(git_file_path)){
    if(!await io.delete(git_file_path)){
      return common.error("failed-remove_file-remove_git");
    }
  }
  return true;
}

async function lazify(name){
  let readJson = await io.lazy.read();
  if(!readJson.wasm){
    readJson.wasm = [];
  }
  if(readJson.wasm.indexOf(name) < 0){
    readJson.wasm.push(name);
  } else {return true;}
  if(!await io.lazy.write(readJson)){
    return false;
  } else {return true;}
}

async function copy_wrapper(name,container){
  let from = await io.dir.app();
  from += '/wasm/wrapper.js';
  const to = container + '/' + name + "/wrapper.js"
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
