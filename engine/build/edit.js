const common = require('../../common');
const fs = require('fs-extra');
const shell = require('shelljs');

module.exports = {init:init};

async function init(base){

  common.tell('processing index');

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
  for(var i in lines){
    let line = lines[i];

    line = line.replace('http://localhost:5566/js/socket.io.js',base + '/js/socket.io.js');
    line = line.replace('http://localhost:5566/css/master.css',base + '/css/master.css');
    line = line.replace('http://localhost:5566/assets/favicon.ico',base + '/assets/favicon.ico');
    line = line.replace('http://localhost:5566/js/bundle.js',base + '/js/bundle.js');

    line = line.replace('="/js/socket.io.js"','="'+base + '/js/socket.io.js"');
    line = line.replace('="/css/master.css"','="'+base + '/css/master.css"');
    line = line.replace('="/assets/favicon.ico"','="'+base + '/assets/favicon.ico"');
    line = line.replace('="/js/bundle.js"','="'+base + '/js/bundle.js"');

    if(!final){
      final = line.toString() + '\n';
    } else {
      final = final + '\n' + line.toString();
    }
  }

  // console.log(final);

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
