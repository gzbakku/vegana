module.exports = {init:init};

async function init(){

  common.tell('transferring built files');

  let currentDirectory = process.cwd() + '\\';

  let files = [
    'js',
    'css',
    'assets'
  ];

  let control = true;

  for(let file of files){
    let from = currentDirectory + 'build//' + file;
    let to = currentDirectory + 'cordova//www//' + file;
    let work = await io.copy(from,to);
    if(!work){
      common.error('failed-process_built_for-' + file);
      control = false;
      break;
    }
  }

  return control;

}
