

module.exports = {
    init:init
};

async function init(){

    // if(!await edit_config()){
    //     return common.error("failed edit config production property");
    // }

}

async function edit_config(){

    const cwd = io.dir.cwd();
    const path = `${cwd}/app/config.json`;
    let read = await io.readJson(path);
    if(!read){
      return common.error(`failed read config => ${path}`);
    }
    read.production = false;
  
    if(!await io.write(path,JSON.stringify(read,null,2))){
      return common.error(`failed write config => ${path}`);
    } else {
      return common.tell("config production is set to : TRUE");
    }
  
  }