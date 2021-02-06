const fs = require('fs-extra');
// const shell = require('shelljs');

module.exports = {init:init};

async function init(){

  common.tell('making build folders');

  let currentDirectory = io.dir.cwd() + '/';

  let files = [
    'build/web',
    'build/web/js',
    'build/web/assets',
    'build/web/css'
  ];

  for(var i=0;i<files.length;i++){
    await io.dir.ensure(currentDirectory + files[i]);
  }

  return true;

}
