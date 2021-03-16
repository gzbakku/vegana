

module.exports = async (path,module_type)=>{

  let sassFilePath;

  let sass_path = await get_sass_location(path,module_type);

  let do_extract_classes = await extract_classes(path);
  if(do_extract_classes === false){
    return common.error("failed-extract_classes-add_class_from_js_to_module_sass");
  }

  let read = await io.read(sass_path);
  if(read === false){
    console.log({read:read});
    return common.error("failed-read_sass_file => " + sass_path);
  }

  let index = 0,edited = false;
  for(let cls of do_extract_classes){
    if(read.indexOf(cls) < 0){
      let parent = '';
      if(index > 0){parent = do_extract_classes[index-1]}
      read = add_class(read,cls,parent);
      edited = true;
    }
    index++;
  }

  if(edited){
    // read += "\n";
    if(true && !await io.write(sass_path,read)){
      return common.error("failed-read_sass_file => " + sass_path);
    }
  }

  return true;

};

function add_class(base,cls,parent){

  if(base.indexOf(cls) < 0 && cls === parent){
    base += `\n.${cls}{}\n`;
    return base;
  }

  let match_all_clases = /\.([\w\s\.-]*)({([\.\w\s:;-]*)})/g;
  let classes = [...base.matchAll(match_all_clases)];

  let matched_group;
  for(let match of classes){
    if(match[0].indexOf(parent) >= 0){
      matched_group = match;break;
    }
  }

  if(!matched_group){
    common.error("no parent found");
    base += `\n.${cls}{}\n`;
    return base;
  }

  let parent_end_at = matched_group.index + String(matched_group[0]).length;
  let before = base.slice(0,parent_end_at);
  let after = base.slice(parent_end_at,base.length);
  let build = `${before} \n\n .${cls}{}${after} \n`;
  return build;

}

async function get_sass_location(path,module_type,dont_follow){

  let
  pathItems = path.split("/"),
  lastItemOfPath = pathItems[pathItems.length-1],
  path_directory = path.replace(lastItemOfPath,"");

  if(lastItemOfPath.indexOf(".") >= 0){
    let lastItemOfPathNameCollection = lastItemOfPath.split(".");
    let buildLastItemName = '';
    for(let i=0;i<lastItemOfPathNameCollection.length-1;i++){
      if(buildLastItemName.length > 0){
        buildLastItemName += ".";
      }
      buildLastItemName += lastItemOfPathNameCollection[i];
    }
    lastItemOfPath = buildLastItemName;
  }

  let
  included = `${path_directory}${lastItemOfPath}.scss`,
  base = `${path_directory}@${lastItemOfPath}.scss`,
  lazy = `${path_directory}+${lastItemOfPath}.scss`;

  let sass_type;
  if(await io.exists(included)){return included;}
  if(await io.exists(base)){return base;}
  if(await io.exists(lazy)){return lazy;} else if(module_type || dont_follow) {
    return false;
  }

  if(!await io.exists(base)){
    if(!io.write(base,"")){
      return common.error("failed-make_base_location-for_non_native_module");
    } else {
      console.log();
      common.tell("---------------------------");
      common.success("sass file created for non native vegana module at => " + base);
      common.tell("please add this file to your sass tree.");
      common.tell("---------------------------");
      console.log();
    }
  }

  // return find_parent_module(path);

  return base;

}

function find_parent_module(path){

  let path_items = path.split("/");
  path_items.reverse();

  let parentModule,module_type;
  for(let item of path_items){
    if(item.indexOf("Comp") >= 0){
      parentModule = item;module_type = 'comp';
    } else if(item.indexOf("Page") >= 0){
      parentModule = item;module_type = 'page';
    } else if(item.indexOf("Cont") >= 0){
      parentModule = item;module_type = 'cont';
    } else if(item.indexOf("Panel") >= 0){
      parentModule = item;module_type = 'panel';
    }
  }

  if(!parentModule){return false;}
  let base_path = path.split(parentModule)[0];
  base_path += parentModule + "/" + module_type + ".js";
  return extract_path_workers(base_path,null,true);

}

async function extract_classes(path){

  let read = await io.read(path);
  if(!read){return common.error("failed-read-js_file-extract_classes => " + path);}

  let regex = /class:('|")([\s\w-]*)('|")/g;
  let extracted = [...read.matchAll(regex)];
  let collect = [];
  for(let base of extracted){
    let class_row = String(base[2]);
    while(class_row.indexOf("'") >= 0){
      class_row = class_row.replace("'","");
    }
    while(class_row.indexOf('"') >= 0){
      class_row = class_row.replace('"',"");
    }
    if(class_row.indexOf(" ") >= 0){
      let space_split = class_row.split(" ");
      for(let s of space_split){
        if(s.length > 0){
          collect.push(s);
        }
      }
    } else {
      collect.push(class_row);
    }
  }//loop loop ends here

  return collect;

}
