const fs = require('fs-extra');

module.exports = {init:init};

async function init(){

  common.tell('processing built files');

  const currentDirectory = process.cwd() + '\\';

  const dirs = [
    'js',
    'css',
    'assets'
  ];

  let control = true;

  for(let dir of dirs){
    let from = currentDirectory + 'build\\' + dir;
    let to = currentDirectory + 'cordova\\www\\' + dir;
    //console.log({from:from,to:to});
    let work = await copy(from,to);
    if(!work){
      common.error('failed-copy_dir-' + files[i]);
      control = false;
      break;
    }
  }

  return control;

}

async function copy(from,to){

  let copy = await fs.copy(from,to)
  .then(()=>{
    return true;
  })
  .catch((error)=>{
    return common.error(error);
  });

  return copy;

}
