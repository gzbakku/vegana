const fs = require('fs-extra');
const shell = require('shelljs');

module.exports = {init:init};

async function init(){

  console.log('>>> making build folders');

  let currentDirectory = process.cwd() + '\\';

  let files = [
    'build',
    'build\\js',
    'build\\assets',
    'build\\css'
  ];

  for(var i=0;i<files.length;i++){
    await check(currentDirectory + files[i]);
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
