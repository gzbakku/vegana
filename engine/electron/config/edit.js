

module.exports = {

  init:async ()=>{

    common.tell("changing main script in package.json");

    let app_data;
    if(true){
      let process_package = await edit_package();
      if(!process_package){return false;}
      app_data = process_package;
    }

    if(true){
      if(!edit_builder(app_data)){return false;}
    }

    return true;

  }

};

async function edit_builder(data){

  const path = io.dir.cwd() + "/electronBuild.js"
  if(!await io.exists(path)){
    return common.error("failed to find package json");
  }

  let read = await io.read(path);
  if(!read){
    return common.error("failed to read electron builder");
  }

  while(read.indexOf("vegana_app") >= 0){
    read = read.replace("vegana_app",data.name);
  }

  read = read.replace("your_name",data.author);

  const write = await io.write(path,read);
  if(!write){
    return common.error("failed to write updated package json");
  }

  return true;

}

async function edit_package(){

  const path = io.dir.cwd() + "/package.json"
  if(!await io.exists(path)){
    return common.error("failed to find package json");
  }

  let read = await io.readJson(path);
  if(!read){
    return common.error("failed to read package json");
  }

  read.main = 'electro.js';

  const write = await io.write(path,JSON.stringify(read,null,2));
  if(!write){
    return common.error("failed to write updated package json");
  }

  return {name:read.name,author:read.author ? read.author : "vegana"};

}
