const fs = require('fs');

module.exports = {

  getUiDir:async ()=>{
    const app_dir = get_app_dir();
    return app_dir + "/ui";
  },

  getUiLibs:async ()=>{

    return new Promise((resolve,reject)=>{

      const app_dir = get_app_dir();
      const ui_dir = app_dir + "/ui";

      fs.readdir(ui_dir,(err,files)=>{
        if(err){reject(err);} else {
          resolve(files);
        }
      });

    });

  },

  getUiComps:async (uiLibName)=>{

    return new Promise((resolve,reject)=>{

      const app_dir = get_app_dir();
      const comp_dir = app_dir + "/ui/" + uiLibName;

      fs.readdir(comp_dir,(err,comps)=>{
        if(err){reject(err);} else {
          resolve(comps);
        }
      });

    });

  }

};

function get_app_dir(){
  let cwd = io.dir.cwd();
  if(cwd.includes("\\")){while(cwd.includes("\\")){cwd = cwd.replace('\\','/');}}
  let hold = cwd.split("/");
  let app_found = false;
  for(let h of hold){if(h === "app"){app_found = true;}}
  if(!app_found){if(io.exists(cwd + "/app")){return cwd + '/app';}}
  let remake = '';
  for(let h of hold){if(h === "app"){break;} else {
    remake += h + "/";
  }}
  return remake + "app";
}
