const fs = require('fs-extra');
const scriptAddressRef = process.argv[1];
const scriptMidPoint = scriptAddressRef.lastIndexOf('\\');
const appDirectory = scriptAddressRef.substring(0,scriptMidPoint)  + '\\electron\\';
const currentDirectory = process.cwd() + '\\';

module.exports = {init:init};

async function init(){

  common.tell('processing built files');

  let currentDirectory = process.cwd() + '\\';

  let files = [
    'electric.html',
    'electro.js'
  ];

  let control = true;

  for(let file of files){
    let from = appDirectory + file;
    let to = currentDirectory + file;
    //console.log({from:from,to:to});
    let work = await copy(from,to);
    if(!work){
      common.error('failed-copy_electron_file-' + file);
      control = false;
      break;
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
