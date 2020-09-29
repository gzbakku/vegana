const fs = require('fs');

module.exports = {

  init:async ()=>{

    const cwd = io.dir.cwd();
    const app = cwd + "/app";
    const sass_dir = cwd + "/sass";
    if(!io.exists(app)){
      return common.error("failed-not_found-app_directory");
    }
    if(!io.exists(sass_dir)){
      return common.error("failed-not_found-sass_directory");
    }

    const hold = await process_dir(app)
    .then((files)=>{
      return files;
    })
    .catch(()=>{
      return false;
    });

    if(!hold){
      return common.error("failed-read_app_dir");
    }
    if(hold.length === 0){
      return common.error("failed-no_sass_files_found");
    }

    const tree_path = sass_dir + "/vegana_tree.scss";
    const build = filefy(hold);

    if(!await io.write(tree_path,build)){
      return common.error("failed-write_vegana_tree_file");
    }

    common.info("all sass files are included in the vegana_tree.scss file in the sass folder please import this file in your master file to finish the tree configration.");

  }

};

function filefy(files){
  let make = '';
  for(let file of files){
    while(file.includes("\\")){
      file = file.replace("\\","/");
    }
    build = "@import '" + file + "';\n"
    make += build;
  }
  return make;
}

async function process_dir(path){

  return new Promise(async (resolve,reject)=>{

    fs.readdir(path,{withFileTypes:true},async (err,files)=>{
      if(err){
        common.error(err);
        common.error("failed-readDir");
        return reject("failed-readDir");
      }
      let collect = [];
      for(let file of files){
        let file_path = path + '/' + file.name;
        if(file.isDirectory()){
          await process_dir(file_path)
          .then((pool)=>{
            for(let hold of pool){
              collect.push(hold);
            }
          });
        } else {
          if(check_file(file.name,file_path)){
            collect.push(file_path);
          }
        }
      }
      resolve(collect);
    });
  });

}

function check_file(file_name,file_path){
  if(file_name[0] === "@"){return false;}
  if(!file_name.includes(".")){return false;}
  let hold = file_name.split(".");
  if(hold[hold.length - 1] !== "scss"){return false;}
  if(hold[0][0] === "_"){
    common.info("remove _ to activate " + file_path);
    return false;
  }
  return true;
}
