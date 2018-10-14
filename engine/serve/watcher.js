const fs = require('fs-extra');
const socket = require('./socket');
const common = require('../../common');
const compile = require('./compiler');
const chokidar = require('chokidar');

async function init(){

  console.log('>>> starting watcher');

  //prod
  let currentDirectory = process.cwd() + '\\';

  //test
  //let currentDirectory = process.cwd() + '\\akku\\';

  //watch index.html

  let location_index = currentDirectory + 'index.html';

  fs.watchFile(location_index,(curr)=>{
    common.tell('file updated => index.html');
    socket.reload();
  });

  //watch bundle.js

  let location_bundle = currentDirectory + 'app\\';

  chokidar.watch(location_bundle)
  .on('change',()=>{
    common.tell('app updated');
    compile.init();
    socket.reload();
  });

  //watch master.css

  let location_css = currentDirectory + 'css\\master.css';

  fs.watchFile(location_css,(curr)=>{
    common.tell('file updated => master.css');
    socket.reload();
  });

  return true;

}

module.exports = {
  init:init
};
