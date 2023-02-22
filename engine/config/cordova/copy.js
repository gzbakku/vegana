module.exports = {init:init};

async function init(){

  common.tell('processing cordova executer');

  const appDirectory = await io.dir.app();
  const bin_path = appDirectory + '/cordova/run.js'
  const cordova_path = io.dir.cwd() + '/cordova/run.js';

  let do_copy = await io.copy(bin_path,cordova_path);
  if(!do_copy){
    return false;
  } else {
    return true;
  }

}
