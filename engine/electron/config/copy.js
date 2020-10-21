module.exports = {init:init};

async function init(){

  common.tell('processing built files');

  let currentDirectory = io.dir.cwd();
  let appDirectory = io.dir.app() + "/electron";

  let files = [
    'electric.html',
    'electro.js',
    'electronRun.js',
    'electronBuild.js'
  ];

  let control = true;

  for(let file of files){
    let from = appDirectory + "/" + file;
    let to = currentDirectory + "/" + file;
    if(!await io.exists(to)){
      if(!await io.copy(from,to)){
        control = false;break;
      };
    }
  }

  return control;

}

async function copy(from,to){

  return fs.copy(from,to)
  .then(()=>{
    return true;
  })
  .catch((error)=>{
    return common.error(error);
  });

}
