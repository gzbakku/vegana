module.exports = {init:init};

async function init(){

  common.tell('transferring built files');

  let currentDirectory = io.dir.cwd() + '/';

  let files = [
    'js',
    'css',
    'assets'
  ];

  let control = true;

  for(let file of files){
    let from = currentDirectory + 'build/web/' + file;
    let to = currentDirectory + 'cordova/www/' + file;
    let work = await io.copy(from,to);
    if(!work){
      common.error('failed-process_built_for-' + file);
      control = false;
      break;
    }
  }

  return control;

}
