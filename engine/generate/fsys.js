const fs = require('fs');

let browser_tree = [];

async function browse_dir(){

  // console.clear();

  const base_dir = await get_base_dir();
  if(!base_dir){
    return common.error("failed-get_base_dir-browse_dir");
  }

  let app_dir = base_dir + "app";
  for(let item of browser_tree){
    app_dir += '/' + item;
  }

  const dirs = await get_sub_dir(app_dir)
  .then((f)=>{return f;}).catch(()=>{return false;});

  if(!dirs){
    return common.error("failed-get_sub_dir-browse_dir");
  }

  let options = [];
  options.push("<<< back");
  options.push(">>> select this dir");
  for(let h of dirs){options.push(h);}

  const select = await input.select("please select a dir",options);
  if(select === "<<< back"){
    if(browser_tree.length > 0){
      browser_tree.pop();
    }
  } else
  if(select === ">>> select this dir"){
    return app_dir;
  } else {
    browser_tree.push(select);
  }

  return await browse_dir();

}

module.exports = {

  browse_dir:browse_dir,

  get_page:async ()=>{
    return await get_items_worker({
      path:"app/pages",
      not_found:"please add some pages",
      select:'please select a page'
    });
  },

  get_cont:async (page_name)=>{
    // console.log({page_name_get_cont:page_name});
    return await get_items_worker({
      path:"app/pages/" + page_name + "/conts",
      not_found:"please add some conts to this page",
      select:'please select a cont'
    });
  },

  get_panel:async (page_name,cont_name)=>{
    return await get_items_worker({
      path:"app/pages/" + page_name + "/conts/" + cont_name + "/panels",
      not_found:"please add some panels to this cont",
      select:'please select a panel'
    });
  },

  in_app_dir:()=>{
    if(io.dir.cwd().indexOf("app") >= 0){return true;} else {return false;}
  },

  get_base_dir:get_base_dir,

};

async function get_items_worker(data){
  const base_dir = await get_base_dir();
  if(!base_dir){
    return common.error("failed-base_dir-get_items_worker");
  }
  const get_items = await get_dir_items(base_dir + data.path)
  .then((i)=>{return i;})
  .catch((e)=>{return false;});
  if(get_items === false){
    return common.error("failed-get_items-get_items_worker");
  }
  if(get_items.length === 0){
    return common.error(data.not_found);
  }
  if(get_items.length === 1){return get_items[0];}
  return input.select(data.select,get_items);
}

async function get_dir_items(path){
  return new Promise((resolve,reject)=>{
    fs.readdir(path,(e,items)=>{
      if(e){
        reject("failed-readdir-not_found");
      } else {
        resolve(items);
      }
    });
  });
}

async function get_sub_dir(path){
  return new Promise((resolve,reject)=>{
    fs.readdir(path,{withFileTypes:true},(e,items)=>{
      if(e){
        reject("failed-readdir-not_found");
      } else {
        let collect = [];
        for(let item of items){
          if(item.isDirectory()){
            collect.push(item.name);
          }
        }
        resolve(collect);
      }
    });
  });
}

async function get_base_dir(){
  let cwd = io.dir.cwd();
  if(cwd.includes("\\")){while(cwd.includes("\\")){cwd = cwd.replace('\\','/');}}
  let hold = cwd.split("/");
  let app_found = false;
  for(let h of hold){if(h === "app"){app_found = true;}}
  if(!app_found){if(await io.exists(cwd + "/app")){return cwd + "/";}}
  let remake = '';
  for(let h of hold){if(h === "app"){break;} else {
    remake += h + "/";
  }}
  return remake;
}
