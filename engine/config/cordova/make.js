const fs = require('fs-extra');
const shell = require('shelljs');

module.exports = {init:init};

async function init(files){

  console.log('making build folders');

  let currentDirectory = process.cwd() + '\\';

  if(!files){
    return common.error('not_found-files-make_file-cordova-config-vegana');
  }

  for(let file of files){
    await check(currentDirectory + file);
  }

  return true;

}

async function check(location){

  let check = await fs.access(location,fs.constants.F_OK)
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    return false;
  });

  if(check){return true;}

  shell.mkdir('-p',location);

  return true;

}
