const fs = require('fs');

module.exports = {

  getUiDir:async ()=>{
    const app_dir = await get_app_dir();
    return app_dir + "/ui";
  },

  getUiLibs:async ()=>{

    return new Promise(async (resolve,reject)=>{

      const app_dir = await get_app_dir();
      const ui_dir = app_dir + "/ui";

      if(!await io.exists(ui_dir)){
        resolve([]);
      }

      fs.readdir(ui_dir,(err,files)=>{
        if(err){reject(err);} else {
          let h = [];
          for(let c of files){if(c !== "index.js"){h.push(c);}}
          resolve(h);
        }
      });

    });

  },

  getUiComps:async (uiLibName)=>{

    return new Promise(async (resolve,reject)=>{

      const app_dir = await get_app_dir();
      const comp_dir = app_dir + "/ui/" + uiLibName;

      fs.readdir(comp_dir,(err,comps)=>{
        if(err){reject(err);} else {
          let h = [];
          for(let c of comps){if(c !== "index.js"){h.push(c);}}
          resolve(h);
        }
      });

    });

  }

};

async function get_app_dir(){
  let cwd = io.dir.cwd();
  if(cwd.includes("\\")){while(cwd.includes("\\")){cwd = cwd.replace('\\','/');}}
  let hold = cwd.split("/");
  let app_found = false;
  for(let h of hold){if(h === "app"){app_found = true;}}
  if(!app_found){if(await io.exists(cwd + "/app")){return cwd + '/app';}}
  let remake = '';
  for(let h of hold){if(h === "app"){break;} else {
    remake += h + "/";
  }}
  return remake + "app";
}
