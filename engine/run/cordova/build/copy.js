const fs = require('fs-extra');

module.exports = {init:init};

async function init(){

  console.log('>>> processing built files');

  let currentDirectory = process.cwd() + '\\';

  let files = [
    'js',
    'css',
    'assets'
  ];

  let control = true;

  for(let file of files){
    let from = currentDirectory + file;
    let to = currentDirectory + 'build//' + file;
    let work = await copy(from,to);
    if(!work){
      common.error('failed-process_built_for-' + file);
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
