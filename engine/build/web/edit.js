// const common = require('../../common');
// const fs = require('fs-extra');
// const shell = require('shelljs');

module.exports = {
  init:init,
  edit_config:edit_config
};

async function init(base){

  common.tell('processing index');

  let currentDirectory = io.dir.cwd() + '/';
  let fileLocation = currentDirectory + 'index.html';

  //read index
  let index = await io.read(fileLocation);
  if(!index){
    return common.error("failed-read_base_html_file => {}"+fileLocation);
  }

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

  let writeLocation = currentDirectory + '/build/web/' + 'index.html'
  let write = await io.write(writeLocation,final);
  if(!write){
    return false;
  } else {
    return true;
  }

}

async function edit_config(){

  const cwd = io.dir.cwd();
  const path = `${cwd}/app/config.json`;
  let read = await io.readJson(path);
  if(!read){
    return common.error(`failed read config => ${path}`);
  }
  read.production = true;

  if(!await io.write(path,JSON.stringify(read,null,2))){
    return common.error(`failed write config => ${path}`);
  } else {
    console.log("___________________________");
    return common.tell("config production is set to : TRUE");
  }

}
