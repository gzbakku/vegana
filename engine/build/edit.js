const common = require('../../common');
const fs = require('fs-extra');
const shell = require('shelljs');

module.exports = {init:init};

async function init(){

  console.log('>>> processing index');

  let currentDirectory = process.cwd() + '\\';
  let fileLocation = currentDirectory + 'index.html';

  //read index
  let index = await fs.readFile(fileLocation,'utf-8')
  .then((data)=>{
    return data;
  })
  .catch((err)=>{
      console.log(err);
      return false;
  });

  let lines = index.split('\n');
  lines.splice(4,9);

  let final;
  for(var i=0;i<lines.length;i++){
    if(!final){
      final = lines[i].toString();
    } else {
      final = final + lines[i].toString();
    }
  }

  let writeLocation = currentDirectory + '\\build\\' + 'index.html'

  let write = await fs.writeFile(writeLocation,final,'utf-8')
  .then(()=>{
    return true;
  })
  .catch((err)=>{
    console.log(err);
    return false;
  });

  if(!write){
    return false;
  } else {
    return true;
  }

}
