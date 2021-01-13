const fs = require("fs");

module.exports = {init:init};

async function init(){

  let base_dir = await io.dir.cwd();
  let common_dir = base_dir + "/app/commonComps";

  common.tell("searching for comps");

  let comps = await get_directories(common_dir);
  if(!comps){
    return common.error("failed-read_dir-children");
  }

  common.tell("generating integration file");

  let integrate_path = await copy(common_dir);
  if(!integrate_path){return common.error("failed-generate-integration-file");}

  common.tell("updating integration file");

  let read = await io.read(integrate_path);
  if(!read){
    return common.error("failed-read-integrate_file");
  }

  if(read.indexOf("{/*comps goes here*/}") < 0){
    return common.error("this is a invalid integration file cannot proceed => " + integrate_path);
  }
  read = read.replace("{/*comps goes here*/}",generate_modules(comps));
  if(!await io.write(integrate_path,read)){
    return common.error("failed-update-integrate_path");
  }

  common.info("please import and initiate integrate file in your index.js file in app folder for automatic integration");
  common.info("if you want to exclude a comp rename its comp.js file to _comp.js file it will be ignored but warn you with a error, else disable the comp yourself in integrate.js.");

  return common.success("common comps collected successfully in integrate.js file");

}

function generate_modules(comps){
  let collect = {};
  for(let comp of comps){
    collect[comp] = "require('./" + comp + "/comp.js')"
  }
  let as_text = JSON.stringify(collect,null,2);
  while(as_text.indexOf('"require(') >=0){
    as_text = as_text.replace('"require(',"require(");
  }
  while(as_text.indexOf('comp.js\')"') >=0){
    as_text = as_text.replace('comp.js\')"',"comp.js')");
  }
  return as_text;
}

async function copy(common_dir){
  const app_dir = await io.dir.app();
  const from_path = app_dir + "/generate/integrate.js";
  const to_path = common_dir + "/integrate.js"
  if(!await io.copy(from_path,to_path)){
    return common.error("failed-generate-intregration-file");
  } else {return to_path;}
}

async function get_directories(common_dir){

  return new Promise(async (resolve,reject)=>{
    fs.readdir(common_dir,{withFileTypes :true},async (err,files)=>{
      if(err){reject(err);}
      let collect = [];
      for(let file of files){
        if(file.isDirectory() && file.name.indexOf("Comp") >= 0){
          let compPath = common_dir + "/" + file.name + "/comp.js";
          if(await io.exists(compPath)){
            collect.push(file.name);
          } else {
            common.error("comp.js not found for commonComp = " + file.name + " at => " + compPath);
          }
        }
      }
      resolve(collect);
    });
  })
  .then((d)=>{return d;})
  .catch((e)=>{
    console.error(e);
    return common.error("failed-read-directory");
  });

}
